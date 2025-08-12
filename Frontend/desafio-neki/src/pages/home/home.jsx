import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import styles from './home.styles.module.css';
import Button from '../../components/Button/Button';
function SkillItem({ skill, onLevelChange, onDelete }) {
  const [editLevel, setEditLevel] = useState(skill.level);
  const [editing, setEditing] = useState(false);
  return (
    <li className={styles.skillItem}>
      <img src={skill.skillImagemUrl || '/default-skill.png'} alt={skill.skillNome || 'Skill'} className={styles.skillImg} />
      <div className={styles.skillInfo}>
        <div className={styles.skillNome}>{skill.skillNome || 'Sem nome'}</div>
        <div className={styles.skillDesc}>{skill.skillDescricao}</div>
      </div>
      <div className={styles.skillLevelBox}>
        <span className={styles.skillLevelLabel}>Level:</span>
        {editing ? (
          <input 
            type="number" 
            min={1} max={10}
            value={editLevel}
            onChange={e => setEditLevel(e.target.value)}
            className={styles.skillLevelInput}
          />
        ) : (
          <span>{skill.level}</span>
        )}
        {editing ? (
          <Button size="small" onClick={() => { onLevelChange(Number(editLevel)); setEditing(false); }}>Salvar</Button>
        ) : (
          <Button size="small" variant="outline" onClick={() => setEditing(true)}>Editar</Button>
        )}
      </div>
      <Button size="small" variant="danger" onClick={onDelete}>Excluir</Button>
    </li>
  );
}

export function Home() {
  const { user, logout } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [newLevel, setNewLevel] = useState(1);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/users/skills', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSkills(res.data);
      } catch (err) {
        setError('Erro ao carregar skills.');
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) fetchSkills();
  }, [user]);

  // Buscar todas as skills disponíveis para o combo
  useEffect(() => {
    async function fetchAllSkills() {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/skills', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllSkills(res.data);
      } catch {
        setAllSkills([]);
      }
    }
    fetchAllSkills();
  }, []);

  async function handleAddSkill(e) {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      const token = localStorage.getItem('token');
      // Verifica se já existe a skill
      if (skills.some(s => String(s.skillId) === String(selectedSkill))) {
        setAddError('Você já possui esta skill!');
        setAddLoading(false);
        return;
      }
      await api.post('/users/skills', {
        skillId: selectedSkill,
        level: newLevel
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setSelectedSkill('');
      setNewLevel(1);
      // Atualiza lista
      const res = await api.get('/users/skills', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(res.data);
    } catch (err) {
      if (err?.response?.data?.message?.includes('Usuário já possui esta skill')) {
        setAddError('Você já possui esta skill!');
      } else {
        setAddError('Erro ao adicionar skill.');
      }
    } finally {
      setAddLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Sistema de Skills</h1>
          <div className={styles.userInfo}>
            <span className={styles.welcome}>Bem-vindo, {user?.nome}</span>
            <Button size="small" onClick={logout}>Sair</Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.card}>
            <h2>Suas Skills</h2>
            <p>Gerencie suas habilidades técnicas aqui.</p>
            <Button onClick={() => setShowModal(true)} style={{ marginBottom: 16 }}>Adicionar Skill</Button>
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : skills.length === 0 ? (
              <p>Nenhuma skill cadastrada.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {skills.map(skill => (
                  <SkillItem
                    key={skill.id}
                    skill={skill}
                    onLevelChange={async (newLevel) => {
                      try {
                        const token = localStorage.getItem('token');
                        await api.put(`/users/skills/${skill.id}`, { level: newLevel }, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        setSkills(skills => skills.map(s => s.id === skill.id ? { ...s, level: newLevel } : s));
                      } catch {
                        alert('Erro ao atualizar level.');
                      }
                    }}
                    onDelete={async () => {
                      if (window.confirm('Deseja remover esta skill?')) {
                        try {
                          const token = localStorage.getItem('token');
                          await api.delete(`/users/skills/${skill.id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                          });
                          setSkills(skills => skills.filter(s => s.id !== skill.id));
                        } catch {
                          alert('Erro ao remover skill.');
                        }
                      }
                    }}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Modal para adicionar skill */}
        {showModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div style={{ background: 'white', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <h3>Adicionar Skill</h3>
              <form onSubmit={handleAddSkill}>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="skill-select">Skill:</label><br />
                  <select
                    id="skill-select"
                    value={selectedSkill}
                    onChange={e => setSelectedSkill(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  >
                    <option value="">Selecione...</option>
                    {allSkills.map(s => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="level-input">Level:</label><br />
                  <input
                    id="level-input"
                    type="number"
                    min={1}
                    max={10}
                    value={newLevel}
                    onChange={e => setNewLevel(Number(e.target.value))}
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4 }}
                  />
                </div>
                {addError && <p style={{ color: 'red' }}>{addError}</p>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
                  <Button type="submit" isLoading={addLoading}>Adicionar</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}