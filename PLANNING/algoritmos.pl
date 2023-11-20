:-consult('bc_pontosAcesso').


% Algoritmo - Caminho entre edificios
caminho_edificios(EdOr,EdDest,LEdCam):-
    caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,
    reverse(LEdInv,LEdCam).

caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-
    (liga(EdAct,EdInt); liga(EdInt,EdAct)),
    \+member(EdInt,LEdPassou),
    caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).


% Algoritmo - Caminho entre pisos
% retorna: Lista de edificios e Lista de pontos de acesso percorridos
caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-
    pisos(EdOr,LPisosOr), member(PisoOr,LPisosOr),
    pisos(EdDest,LPisosDest), member(PisoDest,LPisosDest),
    caminho_edificios(EdOr,EdDest,LEdCam),
    segue_pisos(PisoOr,PisoDest,LEdCam,LLig).
    
segue_pisos(PisoDest,PisoDest,_,[]).

segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos), member(PisoDest1,LPisos), 
    member(PisoDest,LPisos).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct,PisoSeg);
    corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct1,PisoSeg);
    corredor(EdSeg,EdAct,PisoSeg,PisoAct1)), PisoAct1\==PisoAct,
    elevador(EdAct,LPisos), member(PisoAct,LPisos), member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).



% Algoritmo - Caminho entre pisos com menor utilizações de elevador
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-
    conta(LLig,NElev,NCor).
      
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
    NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
    (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).

conta([elev(_,_)|L],NElev,NCor):-
    conta(L,NElevL,NCor),
    NElev is NElevL+1.

conta([cor(_,_)|L],NElev,NCor):-
    conta(L,NElev,NCorL),
    NCor is NCorL+1.


% Algoritmo - Gera grafo e ligações entre as celulas da matriz
cria_grafo(_,0):-!.

cria_grafo(Col,Lin):-
   cria_grafo_lin(Col,Lin),
   Lin1 is Lin1,
   cria_grafo(Col,Lin1).

cria_grafo_lin(0,_):-!.

cria_grafo_lin(Col,Lin):-
   m(Col,Lin,0),!,
   ColS is Col+1, ColA is Col-1, 
   LinS is Lin+1,LinA is Lin-1,
   ((m(ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin)));true)),
   ((m(ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin)));true)),
   ((m(Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS)));true)),
   ((m(Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA)));true)),
   Col1 is Col-1,
   cria_grafo_lin(Col1,Lin).

cria_grafo_lin(Col,Lin):-
   Col1 is Col-1,
   cria_grafo_lin(Col1,Lin).