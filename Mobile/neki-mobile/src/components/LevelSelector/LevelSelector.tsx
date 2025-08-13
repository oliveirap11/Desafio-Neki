import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { styles } from './styles';

interface LevelSelectorProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleLevelSelect = (level: number) => {
    onLevelChange(level);
    setModalVisible(false);
  };

  const renderLevelItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={[
        styles.levelItem,
        item === selectedLevel && styles.selectedLevelItem
      ]}
      onPress={() => handleLevelSelect(item)}
    >
      <Text style={[
        styles.levelText,
        item === selectedLevel && styles.selectedLevelText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>{selectedLevel}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Level</Text>
            <FlatList
              data={levels}
              renderItem={renderLevelItem}
              keyExtractor={(item) => item.toString()}
              numColumns={5}
              contentContainerStyle={styles.levelGrid}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
