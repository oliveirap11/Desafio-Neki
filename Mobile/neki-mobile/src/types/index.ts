// Tipos baseados nos requisitos do PDF

export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  id: number;
  nome: string;
  email: string;
}

export interface RegisterResponse {
  message: string;
  id: number;
  nome: string;
  email: string;
}

export interface Skill {
  id: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
  // Campos legados para compatibilidade
  skillName?: string;
  skillDescription?: string;
  skillUrl?: string;
}

export interface UserSkill {
  id: number;
  skillId: number;
  skillNome: string;
  skillImagemUrl: string;
  skillDescricao: string;
  level: number;
  // Campos legados para compatibilidade
  knowledgeLevel?: number;
  userId?: number;
  skill?: Skill;
  user?: User;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface CreateUserSkillRequest {
  skillId: number;
  level: number;
}

export interface UpdateUserSkillRequest {
  level: number;
}

// Tipos para navegação
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

// Tipos para Context
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (login: string, password: string) => Promise<void>;
  register: (nome: string, email: string, senha: string, confirmarSenha: string) => Promise<RegisterResponse>;
  logout: () => void;
  isLoading: boolean;
}
