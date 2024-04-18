import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';
import {  ModalDirective } from 'ngx-bootstrap/modal'
import $ from 'jquery';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  abrirModalAdicionar(): void {
    this.clienteSelecionado = {idCliente: 0, nmCliente: "", cidade: ""}; // Armazena o cliente selecionado
  }

  abrirModalEditar(cliente: Cliente): void {
    this.clienteSelecionado = {... cliente}; // Armazena o cliente selecionado
  }

  abrirModalExcluir(cliente: Cliente): void {
    this.clienteSelecionado = {... cliente}; // Armazena o cliente selecionado

  }

  adicionarCliente(cliente: Cliente): void {
    if (this.clienteSelecionado) {
      this.clienteService.postClientes(this.clienteSelecionado)
        .subscribe(() => {
          console.log('Cliente adicionado com sucesso:', this.clienteSelecionado);
          this.getClientes();
          window.location.reload(); // Recarrega a página
          
        }, error => {
          console.error('Erro ao salvar cliente:', error);
          // Lógica para tratamento de erro, se necessário
        });
    }
  }

  editarCliente(cliente: Cliente): void {
    if (this.clienteSelecionado) {
      this.clienteService.putClientes(this.clienteSelecionado)
        .subscribe(() => {
          console.log('Cliente editado com sucesso:', this.clienteSelecionado);
          this.getClientes();
          window.location.reload(); // Recarrega a página
          
        }, error => {
          console.error('Erro ao editar cliente:', error);
          // Lógica para tratamento de erro, se necessário
        });
    }
  }
  
  excluirCliente(cliente: Cliente): void {
    this.clienteService.DeleteClientes(cliente)
      .subscribe(clienteDeletado => {
        console.log("Cliente Deletado:", clienteDeletado);
      });
      this.getClientes();
      window.location.reload(); // Recarrega a página
  }
  

  
}
