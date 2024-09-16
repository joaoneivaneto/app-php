import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class CursoService {
    url="http://localhost/api-angular-php/php/";
    vetor:Curso[]=[];

    constructor(private http:HttpClient) { }
    obterCusos():Observable<Curso[]> { 
        //da um get na url e concatena no arquivo listar
        //a url ficará http://localhost/api-angular/php/listar
        return this.http.get(this.url+"listar").pipe(
            //pipe?
            map((res:any) =>{
                    //atribuindo ao vetor um resposta que vai ser os cursos lá no listar.php
                this.vetor = res['cursos'];
                //retorna cursos
                return this.vetor;
            })
        )
    }
    cadastrarCurso(c: Curso): Observable<Curso> {
        return this.http.post<Curso>(this.url + 'cadastrar', c);
    }

    removerCurso(id:any):Observable<Curso> {
       return this.http.delete<Curso>(this.url + 'excluir?idCurso='+id)
        
    }
    alterarCurso(c:Curso):Observable<Curso> {
        
        return this.http.put<Curso>('http://localhost/api-angular-php/php/alterar.php',c)
    }
}
