export type User = {
  /**
   * id no Payload JWT
   */
  id?: string;

  /**
   * sub no Payload JWT
   */
  matricula?: string;

  /**
   * nom no Payload JWT
   */
  nome?: string;

  /**
   * emp no Payload JWT
   */
  empresa?: string;

  /**
   * fil no Payload JWT
   */
  filial?: string;

  /**
   * loc no Payload JWT
   */
  localDeEstoque?: string;

  /**
   * luc no Payload JWT
   */
  centroDeLucro?: string;

  /**
   * pla no Payload JWT
   */
  planta?: string;

  /**
   * est no Payload JWT
   */
  tipoDeEstoque?: string;

  /**
   * role no Payload JWT
   */
  perfil?: string;
};
