import React from 'react';
import { SvgUri } from 'react-native-svg';

interface SkillImageProps {
  imageUrl: string;
  style?: any;
}

export const SkillImage: React.FC<SkillImageProps> = ({
  imageUrl,
  style,
}) => {
  return (
    <SvgUri
      uri={imageUrl}
      width={style?.width || 50}
      height={style?.height || 50}
    />
  );
};
