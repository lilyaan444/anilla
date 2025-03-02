import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase';
import { useAuth } from '../../src/providers/AuthProvider';
import { useTranslation } from '../../src/hooks/useTranslation';
import { friendsStyles as styles } from '../../src/styles';
import { useRouter } from 'expo-router';

interface Friend {
  id: string;
  display_name: string;
  avatar_url: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  is_sender?: boolean; // Pour savoir si l'utilisateur est l'expéditeur de la demande
}

interface Notification {
  id: string;
  type: string;
  content: any;
  read: boolean;
  created_at: string;
}

interface SearchResult {
  id: string;
  display_name: string;
  avatar_url: string;
  already_friend: boolean;
  request_pending: boolean;
}

export default function FriendsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { session } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchFriends();
      fetchNotifications();
    }
  }, [session]);

  const fetchFriends = async () => {
    try {
      // Récupérer les demandes envoyées
      const { data: sentRequests, error: sentError } = await supabase
        .from('friendships')
        .select('receiver_id, status, created_at')
        .eq('sender_id', session?.user?.id);

      if (sentError) throw sentError;

      // Récupérer les demandes reçues
      const { data: receivedRequests, error: receivedError } = await supabase
        .from('friendships')
        .select('sender_id, status, created_at')
        .eq('receiver_id', session?.user?.id);

      if (receivedError) throw receivedError;

      // Récupérer les profils des destinataires seulement s'il y en a
      const receiverIds = sentRequests?.map(req => req.receiver_id) || [];
      let receiverProfiles = [];

      if (receiverIds.length > 0) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', receiverIds);

        if (error) throw error;
        receiverProfiles = data || [];
      }

      // Récupérer les profils des expéditeurs seulement s'il y en a
      const senderIds = receivedRequests?.map(req => req.sender_id) || [];
      let senderProfiles = [];

      if (senderIds.length > 0) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', senderIds);

        if (error) throw error;
        senderProfiles = data || [];
      }

      // Combiner les données
      const sentFriends = sentRequests?.map(req => {
        const profile = receiverProfiles.find(p => p.id === req.receiver_id);
        return {
          id: req.receiver_id,
          display_name: profile?.display_name || 'Utilisateur inconnu',
          avatar_url: profile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          status: req.status,
          created_at: req.created_at,
          is_sender: true
        };
      }) || [];

      const receivedFriends = receivedRequests?.map(req => {
        const profile = senderProfiles.find(p => p.id === req.sender_id);
        return {
          id: req.sender_id,
          display_name: profile?.display_name || 'Utilisateur inconnu',
          avatar_url: profile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          status: req.status,
          created_at: req.created_at,
          is_sender: false
        };
      }) || [];

      setFriends([...sentFriends, ...receivedFriends]);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', session?.user?.id)
        .eq('read', false);

      if (error) throw error;

      setUnreadCount(0);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Ajouter un nouvel état pour les suggestions
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  // Modifier la fonction searchUsers
  const searchUsers = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Rechercher des utilisateurs uniquement par nom d'affichage
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .ilike('display_name', `%${searchQuery}%`)
        .neq('id', session?.user?.id)
        .limit(10);

      if (error) throw error;

      // Vérifier si les utilisateurs sont déjà amis ou ont des demandes en attente
      const results = await Promise.all((data || []).map(async (user) => {
        const { data: friendship } = await supabase
          .from('friendships')
          .select('status')
          .or(`and(sender_id.eq.${session?.user?.id},receiver_id.eq.${user.id}),and(sender_id.eq.${user.id},receiver_id.eq.${session?.user?.id})`)
          .maybeSingle();

        return {
          ...user,
          already_friend: friendship?.status === 'accepted',
          request_pending: friendship?.status === 'pending'
        };
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
      Alert.alert(t('common.error'), t('friends.searchError'));
    } finally {
      setIsSearching(false);
    }
  };

  // Ajouter une nouvelle fonction pour les suggestions en temps réel
  const getSuggestions = async (text: string) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .ilike('display_name', `${text}%`)
        .neq('id', session?.user?.id)
        .limit(5);

      if (error) throw error;

      const suggestionResults = data?.map(user => ({
        id: user.id,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        already_friend: false,
        request_pending: false
      })) || [];

      setSuggestions(suggestionResults);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    try {
      const { error: friendshipError } = await supabase
        .from('friendships')
        .insert({
          sender_id: session?.user?.id,
          receiver_id: receiverId,
          status: 'pending'
        });

      if (friendshipError) throw friendshipError;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: receiverId,
          type: 'friend_request',
          content: {
            sender_id: session?.user?.id,
            sender_name: session?.user?.user_metadata?.display_name || session?.user?.email?.split('@')[0]
          }
        });

      if (notificationError) throw notificationError;

      Alert.alert(t('friends.requestSent'));
      fetchFriends();
      setSearchResults(prev =>
        prev.map(user =>
          user.id === receiverId
            ? { ...user, request_pending: true }
            : user
        )
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
      Alert.alert(t('common.error'), t('friends.requestError'));
    }
  };

  const respondToFriendRequest = async (senderId: string, accept: boolean) => {
    try {
      const { error: friendshipError } = await supabase
        .from('friendships')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('sender_id', senderId)
        .eq('receiver_id', session?.user?.id);

      if (friendshipError) throw friendshipError;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: senderId,
          type: 'friend_response',
          content: {
            responder_id: session?.user?.id,
            responder_name: session?.user?.user_metadata?.display_name || session?.user?.email?.split('@')[0],
            accepted: accept
          }
        });

      if (notificationError) throw notificationError;

      fetchFriends();
      fetchNotifications();
    } catch (error) {
      console.error('Error responding to friend request:', error);
      Alert.alert(t('common.error'), t('friends.responseError'));
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      // Supprimer dans les deux sens (envoyé ou reçu)
      await supabase
        .from('friendships')
        .delete()
        .or(`and(sender_id.eq.${session?.user?.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${session?.user?.id})`);

      Alert.alert(t('friends.friendRemoved'));
      fetchFriends();
    } catch (error) {
      console.error('Error removing friend:', error);
      Alert.alert(t('common.error'), t('friends.removeError'));
    }
  };
  // La fonction viewFriendProfile est correctement définie
  const viewFriendProfile = (friendId: string) => {
    router.push(`/profile/${friendId}`);
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('friends.title')}</Text>
        <TouchableOpacity
          style={styles.notificationBadge}
          onPress={() => {
            setShowNotifications(true);
            markNotificationsAsRead();
          }}
        >
          <Ionicons name="notifications" size={24} color="#8B4513" />
          {unreadCount > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Recherche d'amis */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>{t('friends.findFriends')}</Text>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={getSuggestions}
              placeholder={t('friends.searchPlaceholder')}
              returnKeyType="search"
              onSubmitEditing={searchUsers}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={searchUsers}
              disabled={isSearching}
            >
              <Ionicons name="search" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Suggestions de recherche */}
          {suggestions.length > 0 && searchQuery.trim() !== '' && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map(suggestion => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery(suggestion.display_name);
                    setSuggestions([]);
                    searchUsers();
                  }}
                >
                  <Image
                    source={{ uri: suggestion.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
                    style={styles.suggestionAvatar}
                  />
                  <Text style={styles.suggestionText}>{suggestion.display_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {searchResults.length > 0 && (
            <View style={styles.searchResults}>
              {searchResults.map(user => (
                <View key={user.id} style={styles.userItem}>
                  <Image
                    source={{ uri: user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.userName}>{user.display_name}</Text>
                  {user.already_friend ? (
                    <Text style={styles.alreadyFriend}>{t('friends.alreadyFriend')}</Text>
                  ) : user.request_pending ? (
                    <Text style={styles.pendingRequest}>{t('friends.pendingRequest')}</Text>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => sendFriendRequest(user.id)}
                    >
                      <Ionicons name="person-add" size={18} color="#FFF" />
                      <Text style={styles.addButtonText}>{t('friends.add')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
      </View>

      {/* Demandes d'amis en attente */}
      {friends.filter(friend => friend.status === 'pending' && !friend.is_sender).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('friends.pendingRequests')}</Text>
          {friends
            .filter(friend => friend.status === 'pending' && !friend.is_sender)
            .map(friend => (
              <View key={friend.id} style={styles.requestItem}>
                <Image
                  source={{ uri: friend.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
                  style={styles.friendAvatar}
                />
                <Text style={styles.friendName}>{friend.display_name}</Text>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => respondToFriendRequest(friend.id, true)}
                  >
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => respondToFriendRequest(friend.id, false)}
                  >
                    <Ionicons name="close" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('friends.myFriends')}</Text>
        {friends.filter(friend => friend.status === 'accepted').length > 0 ? (
          <View style={styles.friendsList}>
            {friends
              .filter(friend => friend.status === 'accepted')
              .map(friend => (
                <View key={friend.id} style={styles.friendItem}>
                  <Image
                    source={{ uri: friend.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
                    style={styles.friendAvatar}
                  />
                  <Text style={styles.friendName}>{friend.display_name}</Text>
                  <TouchableOpacity
                    style={styles.viewProfileButton}
                    onPress={() => viewFriendProfile(friend.id)}
                  >
                    <Text style={styles.viewProfileText}>{t('friends.viewProfile')}</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        ) : (
          <Text style={styles.emptyStateText}>{t('friends.noFriends')}</Text>
        )}
      </View>
    </ScrollView>

    {/* Modal des notifications */}
    <Modal
      visible={showNotifications}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowNotifications(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('notifications.title')}</Text>
            <TouchableOpacity
              onPress={() => setShowNotifications(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <View key={notification.id} style={styles.notificationItem}>
                  <View style={styles.notificationIcon}>
                    <Ionicons
                      name={notification.type === 'friend_request' ? 'person-add' : 'checkmark-circle'}
                      size={24}
                      color="#8B4513"
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText}>
                      {notification.type === 'friend_request'
                        ? t('notifications.friendRequest', { name: notification.content.sender_name })
                        : notification.content.accepted
                          ? t('notifications.requestAccepted', { name: notification.content.responder_name })
                          : t('notifications.requestRejected', { name: notification.content.responder_name })
                      }
                    </Text>
                    <Text style={styles.notificationTime}>
                      {new Date(notification.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyStateText}>{t('notifications.empty')}</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  </View>
);
}