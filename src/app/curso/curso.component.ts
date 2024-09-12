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
  cadastro(c:Curso){
    this.curso_servico.cadastrarCurso(c).subscribe(
      (res:Curso[])=>{
        this.vetor = res;
        
        this.curso.nomeCurso='';
        this.curso.valorCurso=0;

        this.selecao();
        
      }
    )
  }

}
