import { Produto } from './produto';
import { Cliente } from './cliente';



export interface Venda {
    idVenda: number;
    dthVenda: Date;
    vlrTotalVenda: number;
    vlrUnitarioVenda: number;
    qtdVenda: number;
    produtoId: number;
    produto: Produto;
    clienteId: number;
    cliente: Cliente;
  }