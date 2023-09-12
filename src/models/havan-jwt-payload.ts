import type { JWTPayload } from 'jose';

export type HavanJwtPayload = JWTPayload & {
  id: string;
  /**
   * Matrícula
   */
  sub: string;
  /**
   * Nome
   */
  nom: string;
  /**
   * Empresa
   */
  emp: string;
  /**
   * Filial
   */
  fil: string;
  /**
   * Local de estoque
   */
  loc: string;
  /**
   * Centro de lucro
   */
  luc: string;
  /**
   * Planta
   */
  pla: string;
  /**
   * Tipo de estoque
   */
  est: string;
  /**
   * Perfil
   */
  role: string;
};
