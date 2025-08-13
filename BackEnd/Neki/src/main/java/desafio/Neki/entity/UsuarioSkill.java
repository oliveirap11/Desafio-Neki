package desafio.Neki.entity;

import jakarta.persistence.*;

@Entity
public class UsuarioSkill {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuario_skill")
  @SequenceGenerator(name = "seq_usuario_skill", sequenceName = "seq_usuario_skill", allocationSize = 1)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario usuario;

  @ManyToOne
  @JoinColumn(name = "skill_id", nullable = false)
  private Skill skill;

  @Column(nullable = false)
  private int level;
  
  public UsuarioSkill() {}

  public UsuarioSkill(Usuario usuario, Skill skill, int level) {
    this.usuario = usuario;
    this.skill = skill;
    this.level = level;
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

  public int getLevel() {
    return level;
  }

  public void setLevel(int level) {
    this.level = level;
  }

}
