import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '../Button/Button';
import { SkillImage } from '../SkillImage/SkillImage';
import { LevelSelector } from '../LevelSelector/LevelSelector';
import { UserSkill } from '../../types';
import { styles } from './styles';

interface SkillItemProps {
  skill: UserSkill;
  onUpdateLevel: (skillId: number, newLevel: number) => void;
  onDelete: (skillId: number) => void;
}

export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  onUpdateLevel,
  onDelete,
}) => {
  const [selectedLevel, setSelectedLevel] = useState(skill.level);

  // Sincroniza o estado local quando o skill.level muda
  useEffect(() => {
    setSelectedLevel(skill.level);
  }, [skill.level]);

  const handleLevelChange = (newLevel: number) => {
    setSelectedLevel(newLevel);
    onUpdateLevel(skill.id, newLevel);
  };

  const handleDelete = () => {
    onDelete(skill.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SkillImage
          imageUrl={skill.skillImagemUrl}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{skill.skillNome}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {skill.skillDescricao}
        </Text>

        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>Level:</Text>
          <LevelSelector
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="🗑️"
          variant="secondary"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};
