:-consult('bc_pontosAcesso').
:-consult('bc_floorMaps').
:-consult('bc_coordenadas').


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

conta([pass(_,_)|L],NElev,NCor):-
    conta(L,NElev,NCorL),
    NCor is NCorL+1.

% Predicado para extrair o piso de um elemento do caminho
extrair_piso_origem(elev(Origem, _), Piso) :-
    Piso = Origem.

extrair_piso_origem(pass(Origem, _), Piso) :-
    Piso = Origem. 

extrair_piso_destino(elev(_, Destino), Piso) :-
    Piso = Destino. 

extrair_piso_destino(pass(_, Destino), Piso) :-
    Piso = Destino. 


% Algoritmo - Gera grafo e ligações entre as celulas da matriz 
cria_grafo(_,_,0):-!.

cria_grafo(Piso,Col,Lin):-
   cria_grafo_lin(Piso,Col,Lin),
   Lin1 is Lin1,
   cria_grafo(Piso,Col,Lin1).

cria_grafo_lin(_,0,_):-!.

cria_grafo_lin(Piso,Col,Lin):-
   m(Piso,Col,Lin,0),!,
   ColS is Col+1, ColA is Col-1, 
   LinS is Lin+1,LinA is Lin-1,
   ((m(Piso,ColS,Lin,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,Lin)));true)),
   ((m(Piso,ColA,Lin,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,Lin)));true)),
   ((m(Piso,Col,LinS,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinS)));true)),
   ((m(Piso,Col,LinA,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinA)));true)),
   ((m(Piso,ColS,LinS,0), m(Piso,Col,LinS,0), m(Piso,ColS,Lin,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinS)));true)),
   ((m(Piso,ColA,LinA,0), m(Piso,Col,LinA,0), m(Piso,ColA,Lin,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinA)));true)),
   ((m(Piso,ColS,LinA,0), m(Piso,Col,LinA,0), m(Piso,ColS,Lin,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinA)));true)),
   ((m(Piso,ColA,LinS,0), m(Piso,ColA,Lin,0), m(Piso,Col,LinS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinS)));true)),
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).

cria_grafo_lin(Piso,Col,Lin):-
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).


% predicado para o user - encontrar caminho entre 2 salas
find_caminho_salas(SalaOr, SalaDest):-
    coordenadas(SalaOr, PisoOr, _,_), coordenadas(SalaDest, PisoDest, _,_),           % obter os pisos das salas
    find_caminho(PisoOr, PisoDest).                           % chamar o predicado para encontrar o melhor caminho
 
% predicado para o user (integração do algoritmo do mlhr caminho e do algoritmo do robot)
find_caminho(PisoOr, PisoDest):-
    melhor_caminho_pisos(PisoOr,PisoDest,Caminho),      % obter o melhor caminho entre os pisos
    write('Melhor Caminho: '),write(Caminho),nl,        
    processar_caminho(Caminho).


% processa cada piso da lista do caminho e chamar cria_grafo/3
processar_caminho([_]).     

processar_caminho([Elemento1, Elemento2|Resto]):-
    processar_pisos_elemento(Elemento1, Elemento2),    % processa os pisos do elemento atual
    processar_caminho([Elemento2 | Resto]).

% processa os pisos de um elemento do caminho
processar_pisos_elemento(elev(Origem, Destino), pass(Origem, Destino)) :-
    extrair_piso_destino(elev(Origem, Destino), Piso),
    %extrair_piso_destino(pass(Origem, Destino), PisoPassDest),
    %coordenadas(Piso, ElevPosX, ElevPosY),
    %coordenadas(Piso, PisoPassDest, PassPosX, PassPosY, _, _),
    dimensoes(Piso, Col, Lin),
    cria_grafo(Piso, Col, Lin).       % chama o cria_grafo/3 para o piso de origem

processar_pisos_elemento(pass(Origem, Destino), elev(Origem, Destino)) :-
    %extrair_piso_origem(pass(Origem, Destino), Piso),
    extrair_piso_destino(pass(Origem, Destino), PisoPassDest),
    %coordenadas(Piso, PisoPassDest, _, _, PassPosX, PassPosY),
    %coordenadas(PisoPassDest, ElevPosX, ElevPosY),
    dimensoes(PisoPassDest, Col, Lin),
    cria_grafo(PisoPassDest, Col, Lin).