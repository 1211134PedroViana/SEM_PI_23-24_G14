:- consult('algoritmos.pl').

:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic avaliacao_termino/1.
:-dynamic tempo_inicio/1.
:-dynamic tempo_limite/1.

tarefa(t1, sala(k1), sala(apn)).
tarefa(t2, sala(beng), sala(k2)).
tarefa(t3, sala(r1), sala(r2)).
tarefa(t4, sala(k2), sala(r1)).


%% ALGORITMO GENÉTICO

% tarefas(NTarefas).
tarefas(4).

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Avaliação Ideal:'), read(AT),
	(retract(avaliacao_termino(_));true), asserta(avaliacao_termino(AT)),
	write('Tempo limite de execução:'), read(TL),
	(retract(tempo_limite(_));true), asserta(tempo_limite(TL)),
	get_time(Tempo),
	(retract(tempo_inicio(_));true), asserta(tempo_inicio(Tempo)).


gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	calc(Ind,V),
	avalia_populacao(Resto,Resto1).

calc(List, Eval):-
   calc_helper(List, 0, Eval).

calc_helper([_], Total, Total).

calc_helper([T1, T2 | Res], Acc, Eval):-
   tarefa(T1, _, Dest1),
   tarefa(T2, Orig2, _),
   find_caminho(Dest1, Orig2, _, _, EvalA),
   NewAcc is Acc + EvalA,
   calc_helper([T2 | Res], NewAcc, Eval).


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

% remove_repetidos/2 remove elementos repetidos de uma lista
remove_repetidos(Lista, ListaSemRepeticao) :-
    sort(Lista, ListaSemRepeticao).

gera_geracao(G,G,Pop):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop):-
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	(verifica_condicao_termino(Pop, IndivAv), termina(IndivAv), ! ; true),       % verifica se a condicao de termino foi atingida
    (verifica_tempo_limite(Pop, IndivAv), termina(IndivAv), ! ; true),           % verifica se ultrapassou o tempo limite
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	append(Pop, NPopAv, PopComb),
	list_to_set(PopComb, PopJuntasSemRepetidos),
	ordena_populacao(PopJuntasSemRepetidos,NPopOrd),
	seleciona_melhores(NPopOrd, Melhores),
	remove_melhores(NPopOrd, Melhores, Restantes),
	associa_produto_avaliacao(Restantes, PopComProduto),
	ordena_populacao_produto(PopComProduto,PopOrdenadaComProduto),				% ordena a populacao com produto
	restantes_melhores(PopOrdenadaComProduto, Pop, Melhores, RMelhoresComProd),	% extrai os N-P primeiros individuos para a geracao seguinte
	remover_produtos(RMelhoresComProd, RMelhores),								% remover os produtos dos individuos
	append(Melhores, RMelhores, PopNova),
	ordena_populacao(PopNova,PopNovaOrd),
	N1 is N+1,
	gera_geracao(N1,G,PopNovaOrd).

verifica_condicao_termino([Ind*V | _], Aval):- 
    avaliacao_termino(Av),
    V =< Av, Aval is Ind*V.

termina(Ind):- 
    write('Melhor Individuo: '), write(Ind), halt.

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
	    random_permutation(Ind1, RandInd1), random_permutation(Ind2, RandInd2),
        cruzar(RandInd1,RandInd2,P1,P2,NInd1),
	    cruzar(RandInd2,RandInd1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

% Remover duplicados entre a nova população e os melhores indivíduos
remove_duplicados([], _, []).

remove_duplicados([Ind*V|Resto], Melhores, NovaPop):-
    member(Ind*_, Melhores),
    !,
    remove_duplicados(Resto, Melhores, NovaPop).
remove_duplicados([Ind*V|Resto], Melhores, [Ind*V|NovaPop]):-
    remove_duplicados(Resto, Melhores, NovaPop).

% associar a cada individuo o produto da sua avaliação por um num aleatorio entre 0 e 1
associa_produto_avaliacao([], []).
associa_produto_avaliacao([Ind*V|Resto], [Ind*V*RMult|RestoComProduto]) :-
    random(0.0, 1.0, Random),
	RMult is V * Random,
    associa_produto_avaliacao(Resto, RestoComProduto).

% passar os N-P primeiros individuos para a geracao seguinte
restantes_melhores(PopOrdenadaComProduto, Pop, Melhores, NovaPopulacao) :-
    length(Pop, N),
    length(Melhores, P),
    R is N - P,
	sublista2(PopOrdenadaComProduto, 1, R, NovaPopulacao).	% extrai os N-P primeiros individuos

% remover os produtos dos individuos
remover_produtos([], []).
remover_produtos([Ind*A*_|Resto], [Ind*A|RestoSemProdutos]) :-
	remover_produtos(Resto, RestoSemProdutos).

% sort para populacao com produto
ordena_populacao_produto(PopAv,PopAvOrd):-
	bsort2(PopAv,PopAvOrd).

bsort2([X],[X]):-!.
bsort2([X|Xs],Ys):-
    bsort2(Xs,Zs),
    btroca2([X|Zs],Ys).

btroca2([X],[X]):-!.

btroca2([X*VX*VI,Y*VY*VJ|L1],[Y*VY*VJ|L2]):-
    VI > VJ,!, 
    btroca2([X*VX*VI|L1],L2).

btroca2([X|L1],[X|L2]):-btroca2(L1,L2).

% obtem a sublista de uma lista a partir do indice inicio ate o indice fim
sublista2(Lista, Inicio, Fim, Sublista) :-
    length(Lista, Tamanho),
    between(1, Tamanho, Inicio),
    between(Inicio, Tamanho, Fim),
    sublista_aux2(Lista, Inicio, Fim, Sublista).

% predicado auxiliar para construir a sublista
sublista_aux2([], _, _, []).

sublista_aux2([H|T], Inicio, Fim, [H|Resto]) :-
    between(Inicio, Fim, Pos),
    PosInicio is Inicio,
    PosFim is Fim,
    Pos >= PosInicio,
    Pos =< PosFim,
    NovoInicio is Inicio + 1,
    sublista_aux2(T, NovoInicio, Fim, Resto).
sublista_aux2([_|T], Inicio, Fim, Sublista) :-
    NovoInicio is Inicio + 1,
    sublista_aux2(T, NovoInicio, Fim, Sublista).

% selecionar os P primeiros individuos (20% de N, mas no min 1)
seleciona_melhores(PopOrdenada, MelhoresPop) :-
    length(PopOrdenada, T),
    P1 is max(1, round(0.2 * T)),
    sublista2(PopOrdenada, 1, P1, MelhoresPop).	% extrai os P primeiros individuos

% extrair os mlhrs individuos da lista original
remove_melhores(PopOrdenada, MelhoresPop, PopRestantes) :-
    subtract(PopOrdenada, MelhoresPop, PopRestantes).


% verifica se o tempo decorrido é maior que o limite estabelecido
verifica_tempo_limite(Pop, IndivAv) :-
    tempo_decorrido(TempoDecorrido),
    tempo_limite(Limite),
    TempoDecorrido >= Limite,!,
    select(IndivAv, Pop, _).                    % obtem o melhor individuo da populacao (o primeiro, pois a populacao esta ordenada)

% calcula o tempo decorrido desde o inicio da execucao do algoritmo
tempo_decorrido(TempoDecorrido) :-
    tempo_inicio(TempoInicio),
    get_time(TempoAtual),
    TempoDecorrido is TempoAtual - TempoInicio.