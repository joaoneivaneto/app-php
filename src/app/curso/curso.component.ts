import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  
  vetor:Curso[]=[]
  curso = new Curso();
  constructor(private curso_servico:CursoService) { }
  
  ngOnInit() {
    this.selecao()
  }
  
  selecao(){
	  //puxando função curoso
	  //o subscribe da acesso aos dados
    this.curso_servico.obterCusos().subscribe(
	    // res do tipo curso me entrega a lista de dados
      (res:Curso[])=>{
        this.vetor=res;
      })
    
  }
  cadastro(){
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      ()=>{
        this.curso.nomeCurso='';
        this.curso.valorCurso=0;

        this.selecao();
        
      }
      
        
       
      
    )
  }
  remover():void{
    this.curso_servico.removerCurso(this.curso.idCurso).subscribe(
      ()=>{
        
        this.curso.nomeCurso="";
        this.curso.valorCurso=0;
        this.selecao();
      }
    )
    
  }
  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso= c.valorCurso;
  }
  alterar(){
    
    this.curso_servico.alterarCurso(this.curso).subscribe(
      ()=>{
        console.log(this.curso);
        this.curso.nomeCurso='';
        this.curso.valorCurso=0;
        this.selecao();
      }
    )
  }
}
