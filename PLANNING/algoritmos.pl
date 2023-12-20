:-consult('bc_pontosAcesso').
:-consult('bc_floorMaps').
:-consult('bc_coordenadas').

:-dynamic ligacel/4.


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

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[pass(PisoAct,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct,PisoSeg);
    corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),pass(PisoAct1,PisoSeg)|LOutrasLig]):-
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
   conta(L,NElevL,NCor),NElev is NElevL+1.

conta([pass(_,_)|L],NElev,NCor):-
   conta(L,NElev,NCorL), NCor is NCorL+1.


% Algoritmo - Gera grafo e ligações entre as celulas da matriz 
cria_grafo(_,_,0):-!.

cria_grafo(Piso,Col,Lin):-
   cria_grafo_lin(Piso,Col,Lin),
   Lin1 is Lin-1,
   cria_grafo(Piso,Col,Lin1).

cria_grafo_lin(_,0,_):-!.

cria_grafo_lin(Piso,Col,Lin):- 
   m(Piso,Lin,Col,0),!,
   ColS is Col+1, ColA is Col-1, 
   LinS is Lin+1,LinA is Lin-1,
   ((m(Piso,Lin,ColS,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,Lin),1));true)),
   ((m(Piso,Lin,ColA,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,Lin),1));true)),
   ((m(Piso,LinS,Col,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinS),1));true)),
   ((m(Piso,LinA,Col,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinA),1));true)),
   ((m(Piso,LinS,ColS,0), m(Piso,LinS,Col,0), m(Piso,Lin,ColS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinS),sqrt(2)));true)),
   ((m(Piso,LinA,ColA,0), m(Piso,LinA,Col,0), m(Piso,Lin,ColA,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinA),sqrt(2)));true)),
   ((m(Piso,LinA,ColS,0), m(Piso,LinA,Col,0), m(Piso,Lin,ColS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinA),sqrt(2)));true)),
   ((m(Piso,LinS,ColA,0), m(Piso,Lin,ColA,0), m(Piso,LinS,Col,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinS),sqrt(2)));true)),
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).

cria_grafo_lin(Piso,Col,Lin):-
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).


% determinar o tipo da entidade recebida e busca o piso
determinar_tipo_entidade(sala(Elemento), Piso) :-
    sala(Elemento, Piso).                       

determinar_tipo_entidade(elev(Piso), Piso).

determinar_tipo_entidade(pass(Orig, Dest), Piso):-
    corredor(_,_, Orig, Dest), Piso = Orig. 

% Encontra o melhor caminho entre pisos e da append do elemento de origem e destino a lista
caminho_pisos(ElementoOrigem, ElementoDestino, CaminhoCompleto) :-
    determinar_tipo_entidade(ElementoOrigem, PisoOr),                         
    determinar_tipo_entidade(ElementoDestino, PisoDest),
    melhor_caminho_pisos(PisoOr,PisoDest,Caminho),      
    append([ElementoOrigem|Caminho], [ElementoDestino], CaminhoCompleto).
    %write('Melhor Caminho: '),write(CaminhoCompleto),nl,nl.

 
% Recebo Elemento de partida e de destino e executo os predicados de encontrar
% o melhor caminho entre pisos e o melhor caminho entre elementos do mesmo piso
find_caminho(ElementoOrigem, ElementoDestino, CaminhoPisos, CaminhosRobot, TotalCusto):-
    caminho_pisos(ElementoOrigem, ElementoDestino, CaminhoPisos), 
    processar_caminho(CaminhoPisos, CaminhosRobot, TotalCusto).


% processa cada par da lista do melhor caminho
processar_caminho(Elementos, Caminhos, TotalCusto) :-
    processar_caminho_aux(Elementos, Caminhos, 0, TotalCusto).

% Base case when there are no more elements in the list
processar_caminho_aux([_], [], TotalCusto, TotalCusto).

% Recursive case
processar_caminho_aux([Elemento1, Elemento2 | Resto], [Cam | CamResto], PartialCusto, TotalCusto) :-
    processar_par(Elemento1, Elemento2, Cam, Custo),
    NovoPartialCusto is PartialCusto + Custo,
    processar_caminho_aux([Elemento2 | Resto], CamResto, NovoPartialCusto, TotalCusto).

% processa pares de elementos da lista retornada pelo predicado melhor_caminho_pisos/3
processar_par(elev(_, ElevDestino), pass(PassOrigem, PassDestino), Cam, Custo) :-
    gera_grafo(ElevDestino),
    encontra_caminho(elev(_, ElevDestino), pass(PassOrigem, PassDestino), Cam, Custo).

processar_par(pass(PassOrigem, PassDestino), elev(ElevOrigem, _), Cam, Custo) :-
    gera_grafo(PassDestino),
    encontra_caminho(pass(PassOrigem, PassDestino), elev(ElevOrigem, _), Cam, Custo).

processar_par(pass(PassOrigem, PassDestino), pass(Pass2Origem, Pass2Destino), Cam, Custo) :-
    gera_grafo(PassDestino),
    encontra_caminho(pass(PassOrigem, PassDestino), pass(Pass2Origem, Pass2Destino), Cam, Custo).

processar_par(sala(SalaOrig), elev(Piso, _), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(sala(SalaOrig), elev(Piso, _), Cam, Custo).

processar_par(elev(_, Piso), sala(SalaOrig), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(elev(_, Piso), sala(SalaOrig), Cam, Custo).

processar_par(sala(SalaOrig), pass(PassOrigem, PassDestino), Cam, Custo) :-
    gera_grafo(PassOrigem),
    encontra_caminho(sala(SalaOrig), pass(PassOrigem, PassDestino), Cam, Custo).

processar_par(pass(PassOrigem, PassDestino), sala(SalaOrig), Cam, Custo) :-
    gera_grafo(PassDestino),
    encontra_caminho(pass(PassOrigem, PassDestino), sala(SalaOrig), Cam, Custo).

processar_par(sala(SalaOrig), sala(SalaDest), Cam, Custo) :-
    sala(SalaOrig, Piso),
    gera_grafo(Piso),
    encontra_caminho(sala(SalaOrig), sala(SalaDest), Cam, Custo).

processar_par(sala(SalaOrig), elev(Piso), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(sala(SalaOrig), elev(Piso), Cam, Custo).

processar_par(pass(PassOrigem, PassDestino), elev(Piso), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(pass(PassOrigem, PassDestino), elev(Piso), Cam, Custo).

processar_par(elev(Piso), sala(SalaDest), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(elev(Piso), sala(SalaDest), Cam, Custo).

processar_par(elev(Piso), pass(PassOrigem, PassDestino), Cam, Custo) :-
    gera_grafo(Piso),
    encontra_caminho(elev(Piso), pass(PassOrigem, PassDestino), Cam, Custo).


% Gera o grafo do piso e constroi as ligações (ligacel/4)
gera_grafo(Piso) :-
    dimensoes(Piso, NrCol, NrLin),
    cria_grafo(Piso, NrCol, NrLin).


% Encontra o caminho entre um elevador e uma passagem através do algoritmo DFS ou ASTAR
encontra_caminho(elev(_, ElevDestino), pass(PassOrigem, PassDestino), Cam, Custo) :-
    coordenadas(ElevDestino, ElevPosX, ElevPosY),
    coordenadas(PassOrigem, PassDestino, PassPosX, PassPosY, _, _),
    aStar(cel(ElevPosX,ElevPosY), cel(PassPosX,PassPosY), Cam, Custo, ElevDestino).
    %dfs(ElevDestino, cel(ElevPosX,ElevPosY), cel(PassPosX,PassPosY), Cam),
    %write_piso(ElevDestino, elev(ElevDestino), pass(PassOrigem, PassDestino), Cam).

% Encontra o caminho entre uma passagem e um elevador através do algoritmo DFS ou ASTAR
encontra_caminho(pass(PassOrigem, PassDestino), elev(ElevOrigem, _), Cam, Custo) :-
    coordenadas(PassOrigem, PassDestino, _, _, PassPosX, PassPosY),
    coordenadas(ElevOrigem, ElevPosX, ElevPosY),
    aStar(cel(PassPosX,PassPosY), cel(ElevPosX,ElevPosY), Cam, Custo, PassDestino).
    %dfs(PassDestino, cel(PassPosX,PassPosY), cel(ElevPosX,ElevPosY), Cam),
    %write_piso(PassDestino, pass(PassOrigem, PassDestino), elev(ElevOrigem), Cam).

% Encontra o caminho entre duas passagens através do algoritmo DFS ou ASTAR
encontra_caminho(pass(PassOrigem, PassDestino), pass(Pass2Origem, Pass2Destino), Cam, Custo) :-
    coordenadas(PassOrigem, PassDestino, _, _, PassPosX, PassPosY),
    coordenadas(Pass2Origem, Pass2Destino, Pass2PosX, Pass2PosY, _,_),
    aStar(cel(PassPosX,PassPosY), cel(Pass2PosX,Pass2PosY), Cam, Custo, PassDestino).
    %dfs(PassDestino, cel(PassPosX,PassPosY), cel(Pass2PosX,Pass2PosY), Cam),
    %write_piso(PassDestino, pass(PassOrigem, PassDestino), pass(Pass2Origem, Pass2Destino), Cam).

% Encontra o caminho entre uma sala e um elevador através do algoritmo DFS ou ASTAR
encontra_caminho(sala(SalaOrig), elev(Piso, _), Cam, Custo) :-
    coordenadas(SalaOrig, Piso, SalaCol, SalaLin),
    coordenadas(Piso, ElevCol, ElevLin),   
    aStar(cel(SalaCol,SalaLin), cel(ElevCol,ElevLin), Cam, Custo, Piso).
    %dfs(Piso, cel(SalaCol,SalaLin), cel(ElevCol,ElevLin), Cam),
    %write_piso(Piso, sala(SalaOrig), elev(Piso), Cam).

% Encontra o caminho entre um elevador e uma sala através do algoritmo DFS ou ASTAR
encontra_caminho(elev(_, Piso), sala(SalaOrig), Cam, Custo) :-
    coordenadas(SalaOrig, Piso, SalaCol, SalaLin),
    coordenadas(Piso, ElevCol, ElevLin),   
    aStar(cel(ElevCol,ElevLin), cel(SalaCol,SalaLin), Cam, Custo, Piso).
    %dfs(Piso, cel(ElevCol,ElevLin), cel(SalaCol,SalaLin), Cam),
    %write_piso(Piso, elev(Piso), sala(SalaOrig), Cam).

% Encontra o caminho entre uma sala e uma passagem através do algoritmo DFS ou ASTAR
encontra_caminho(sala(SalaOrig), pass(PassOrigem, PassDestino), Cam, Custo) :-
    coordenadas(SalaOrig, PassOrigem, SalaCol, SalaLin),
    coordenadas(PassOrigem, PassDestino, PassCol, PassLin, _, _),  
    aStar(cel(SalaCol,SalaLin), cel(PassCol,PassLin), Cam, Custo, PassOrigem).
    %dfs(PassOrigem, cel(SalaCol,SalaLin), cel(PassCol,PassLin), Cam),
    %write_piso(PassOrigem, sala(SalaOrig), pass(PassOrigem, PassDestino), Cam).

% Encontra o caminho entre uma passagem e uma sala através do algoritmo DFS ou ASTAR
encontra_caminho(pass(PassOrigem, PassDestino), sala(SalaOrig), Cam, Custo) :-
    coordenadas(SalaOrig, PassDestino, SalaCol, SalaLin),
    coordenadas(PassOrigem, PassDestino, _, _, PassCol, PassLin),
    aStar(cel(PassCol,PassLin), cel(SalaCol,SalaLin), Cam, Custo, PassDestino). 
    %dfs(PassDestino, cel(PassCol,PassLin), cel(SalaCol,SalaLin), Cam),
    %write_piso(PassDestino, pass(PassOrigem, PassDestino), sala(SalaOrig), Cam).

% Encontra o caminho entre duas salas através do algoritmo DFS ou ASTAR
encontra_caminho(sala(SalaOrig), sala(SalaDest), Cam, Custo) :-
    sala(SalaOrig, Piso),
    coordenadas(SalaOrig, Piso, SalaOrigCol, SalaOrigLin),
    coordenadas(SalaDest, Piso, SalaDestCol, SalaDestLin),
    aStar(cel(SalaOrigCol,SalaOrigLin), cel(SalaDestCol,SalaDestLin), Cam, Custo, Piso).  
    %dfs(PassDestino, cel(SalaOrigCol,SalaOrigLin), cel(SalaDestCol,SalaDestLin), Cam),
    %write_piso(Piso, sala(SalaOrig), sala(SalaDest), Cam).

% Encontra o caminho entre uma sala e um elevador se for destino através do algoritmo DFS ou ASTAR
encontra_caminho(sala(SalaOrig), elev(Piso), Cam, Custo) :-
    coordenadas(SalaOrig, Piso, SalaCol, SalaLin),
    coordenadas(Piso, ElevCol, ElevLin), 
    aStar(cel(SalaCol,SalaLin), cel(ElevCol,ElevLin), Cam, Custo, Piso).  
    %dfs(Piso, cel(SalaCol,SalaLin), cel(ElevCol,ElevLin), Cam),
    %write_piso(Piso, sala(SalaOrig), elev(Piso), Cam).

% Encontra o caminho entre uma passagem e um elevador se for destino através do algoritmo DFS ou ASTAR
encontra_caminho(pass(PassOrigem, PassDestino), elev(Piso), Cam, Custo) :-
    coordenadas(PassOrigem, PassDestino, _, _, PassCol, PassLin),
    coordenadas(Piso, ElevCol, ElevLin), 
    aStar(cel(PassCol,PassLin), cel(ElevCol,ElevLin), Cam, Custo, Piso). 
    %dfs(Piso, cel(PassCol,PassLin), cel(ElevCol,ElevLin), Cam),
    %write_piso(Piso, pass(PassOrigem, PassDestino), elev(Piso), Cam).

% Encontra o caminho entre um elevador se for origem e uma sala através do algoritmo DFS ou ASTAR
encontra_caminho(elev(Piso), sala(SalaDest), Cam, Custo) :-
    coordenadas(SalaDest, Piso, SalaCol, SalaLin),
    coordenadas(Piso, ElevCol, ElevLin), 
    aStar(cel(ElevCol,ElevLin), cel(SalaCol,SalaLin), Cam, Custo, Piso).  
    %dfs(Piso, cel(ElevCol,ElevLin), cel(SalaCol,SalaLin), Cam),
    %write_piso(Piso, elev(Piso), sala(SalaDest), Cam).

% Encontra o caminho entre um elevador se for origem e uma passagem através do algoritmo DFS ou ASTAR
encontra_caminho(elev(Piso), pass(PassOrigem, PassDestino), Cam, Custo) :-
    coordenadas(PassOrigem, PassDestino, PassCol, PassLin, _, _),
    coordenadas(Piso, ElevCol, ElevLin), 
    aStar(cel(ElevCol,ElevLin), cel(PassCol,PassLin), Cam, Custo, Piso).
    %dfs(Piso, cel(ElevCol,ElevLin), cel(PassCol,PassLin), Cam),
    %write_piso(Piso, elev(Piso), pass(PassOrigem, PassDestino), Cam).
    

% Algoritmo DFS
dfs(Piso,Orig,Dest,Cam):-
   dfs2(Piso,Orig,Dest,[Orig],Cam).

dfs2(_,Dest,Dest,LA,Cam):-
   reverse(LA,Cam).

dfs2(Piso,Act,Dest,LA,Cam):-
   (ligacel(Piso,Act,X,_); ligacel(Piso,X,Act,_)), \+ member(X,LA),
   dfs2(Piso,X,Dest,[X|LA],Cam).

all_dfs(Piso,Orig,Dest,LCam):-
   findall(Cam,dfs(Piso,Orig,Dest,Cam),LCam).

better_dfs(Piso,Orig,Dest,Cam):- 
   all_dfs(Piso,Orig,Dest,LCam), shortlist(LCam,Cam,_).

shortlist([L],L,N):-!,length(L,N).

shortlist([L|LL],Lm,Nm):-
   shortlist(LL,Lm1,Nm1), length(L,NL),
   ((NL<Nm1,!,Lm=L,Nm is NL); (Lm=Lm1,Nm is Nm1)).


% A STAR

estimativa(cel(X1, Y1), cel(X2, Y2), Distancia) :-
    Distancia is sqrt((X1 - X2)^2 + (Y1 - Y2)^2).

% predicado principal do A*
aStar(Orig, Dest, Cam, Custo, Piso) :-
    aStar2(Piso, Dest, [(_, 0, [Orig])], Cam, Custo).

% predicado auxiliar para o A*
aStar2(_, Dest, [(_, Custo, [Dest|T])|_], Cam, Custo) :-
    reverse([Dest|T], Cam).

aStar2(Piso, Dest, [(_, Ca, LA)|Outros], Cam, Custo) :-
    LA = [Act|_],
    findall((CEX, CaX, [X|LA]),
            (Dest \== Act, 
                (ligacel(Piso, Act, X,CustoX);ligacel(Piso, X, Act,CustoX)), \+ member(X, LA), 
                CaX is CustoX + Ca, estimativa(X, Dest, EstX),
            CEX is CaX + EstX), 
        Novos),
    append(Outros, Novos, Todos),
    % write('Novos='),write(Novos),nl,
    sort(Todos, TodosOrd),
    % write('TodosOrd='),write(TodosOrd),nl,
    aStar2(Piso, Dest, TodosOrd, Cam, Custo).

% Debugging predicate with format/2
write_piso(Piso, Origem, Destino, Caminho) :-
    format("Piso: ~w~n", [Piso]),
    format("Origem: ~w~n", [Origem]),
    format("Destino: ~w~n", [Destino]),
    format("Caminho: ~w~n", [Caminho]).
    %format("--------------//------------").