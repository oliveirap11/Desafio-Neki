import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../context/AuthContext';
import { skillAPI, userSkillAPI } from '../../services/api';
import { UserSkill, Skill } from '../../types';
import { styles } from './style';
import { SkillItem } from '../../components/SkillItem/SkillItem';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Estados para lista de skills do usuário
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Estados para o modal de adicionar skill
  const [showModal, setShowModal] = useState(false);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [newLevel, setNewLevel] = useState('1');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    loadUserSkills();
    loadAllSkills();
  }, []);

  const loadUserSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const skills = await userSkillAPI.getUserSkills();
      setUserSkills(skills);
    } catch (error: any) {
      setError('Erro ao carregar suas skills');
      console.error('Erro ao carregar skills do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllSkills = async () => {
    try {
      const skills = await skillAPI.getAllSkills();
      setAllSkills(skills);
    } catch (error) {
      console.error('Erro ao carregar skills disponíveis:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserSkills();
    setRefreshing(false);
  };

  const handleAddSkill = async () => {
    if (!selectedSkillId || !newLevel) {
      setAddError('Por favor, selecione uma skill e defina o level');
      return;
    }

    const level = parseInt(newLevel);
    if (level < 1 || level > 10) {
      setAddError('Level deve ser entre 1 e 10');
      return;
    }

    // Verificar se já possui essa skill
    if (userSkills.some(skill => skill.skillId === selectedSkillId)) {
      setAddError('Você já possui esta skill!');
      return;
    }

    try {
      setAddLoading(true);
      setAddError('');
      
      await userSkillAPI.createUserSkill({
        skillId: selectedSkillId,
        level
      });

      // Recarregar a lista
      await loadUserSkills();
      
      // Fechar modal e limpar dados
      setShowModal(false);
      setSelectedSkillId(null);
      setNewLevel('1');
      
      Alert.alert('Sucesso', 'Skill adicionada com sucesso!');
    } catch (error: any) {
      setAddError(error.response?.data?.message || 'Erro ao adicionar skill');
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateLevel = async (skillId: number, newLevel: number) => {
    try {
      await userSkillAPI.updateUserSkill(skillId, { 
        level: newLevel 
      });
      
      // Atualizar a lista local
      setUserSkills(skills => 
        skills.map(skill => 
          skill.id === skillId ? { 
            ...skill, 
            level: newLevel 
          } : skill
        )
      );
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar level da skill');
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente remover esta skill?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await userSkillAPI.deleteUserSkill(skillId);
              setUserSkills(skills => skills.filter(skill => skill.id !== skillId));
              Alert.alert('Sucesso', 'Skill removida com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao remover skill');
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmar logout',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout }
      ]
    );
  };

  const renderSkillItem = ({ item }: { item: UserSkill }) => (
    <SkillItem
      skill={item}
      onUpdateLevel={handleUpdateLevel}
      onDelete={handleDeleteSkill}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Sistema de Skills</Text>
            <View style={styles.userInfo}>
              <Text style={styles.welcome}>Bem-vindo, {user?.nome}</Text>
              <Button
              title="Sair"
              variant="secondary"
              size="small"
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suas Skills</Text>
          <Text style={styles.cardSubtitle}>Gerencie suas habilidades técnicas aqui.</Text>
          
          <Button
            title="Adicionar Skill"
            onPress={() => setShowModal(true)}
            style={styles.addButton}
          />

          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : userSkills.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma skill cadastrada.</Text>
          ) : (
            <FlatList
              data={userSkills}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSkillItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>

      {/* Modal para adicionar skill */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Adicionar Skill</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Skill:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedSkillId}
                    onValueChange={(value) => setSelectedSkillId(value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione uma skill..." value={null} />
                    {allSkills.map((skill) => (
                      <Picker.Item
                        key={skill.id}
                        label={String(skill.nome || `Skill ${skill.id}`)}
                        value={skill.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Level (1-10):</Text>
                <Input
                  value={newLevel}
                  onChangeText={setNewLevel}
                  keyboardType="numeric"
                  placeholder="Digite o level (1-10)"
                />
              </View>

              {addError ? (
                <Text style={styles.modalError}>{addError}</Text>
              ) : null}

              <View style={styles.modalActions}>
                <Button
                  title="Cancelar"
                  variant="secondary"
                  onPress={() => {
                    setShowModal(false);
                    setSelectedSkillId(null);
                    setNewLevel('1');
                    setAddError('');
                  }}
                  style={styles.modalButton}
                />
                <Button
                  title={addLoading ? 'Adicionando...' : 'Adicionar'}
                  onPress={handleAddSkill}
                  disabled={addLoading}
                  style={styles.modalButton}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
};
