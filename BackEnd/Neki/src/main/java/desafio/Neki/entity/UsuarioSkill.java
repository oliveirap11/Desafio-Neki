package desafio.Neki.entity;

import jakarta.persistence.*;

@Entity
public class UsuarioSkill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario usuario;

  @ManyToOne
  @JoinColumn(name = "skill_id", nullable = false)
  private Skill skill;

  @Column(nullable = false)
  private int nivel;
  
  public UsuarioSkill() {}

  public UsuarioSkill(Usuario usuario, Skill skill, int nivel) {
    this.usuario = usuario;
    this.skill = skill;
    this.nivel = nivel;
  }
  
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Usuario getUsuario() {
    return usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }

  public Skill getSkill() {
    return skill;
  }

  public void setSkill(Skill skill) {
    this.skill = skill;
  }

  public int getNivel() {
    return nivel;
  }

  public void setNivel(int nivel) {
    this.nivel = nivel;
  }

}
