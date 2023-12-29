% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/json)).
:- use_module(library(http/http_json)).

% Algoritmos
:- consult('algoritmos.pl').
:- consult('tarefaAlgoritmos.pl').
:- consult('parsers.pl').

:- set_setting(http:cors, [*]).

% Start Prolog Server on Port: 5000
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).


:- http_handler('/findPath', find_path_handler, []).

find_path_handler(Request) :-
    cors_enable(Request,
                [ methods([get]),
                  origin('http://localhost:4200')
                ]), 
    % Extract parameters from the request
    http_parameters(Request, [origem(Origem,[]),destino(Destino,[])]),

    parse_ponto_acesso(Origem, ParsedOrigem),
    parse_ponto_acesso(Destino, ParsedDestino),

    % Calling the predicate with the fixed values
    find_caminho(ParsedOrigem, ParsedDestino, ListaCaminho, ListaMovimentos, CustoTotal),

    convert_lista_caminho(ListaCaminho, CaminhoJson),
    convert_lista_movimentos(ListaMovimentos, MovimentosJson),

    reply_json(json{caminho: CaminhoJson, movimentos: MovimentosJson},[json_object(dict)]).


:- http_handler('/tasksPath', best_tasks_path, []).

best_tasks_path(Request) :-
    http_read_json_dict(Request, JSON),
    maplist(json_to_task, JSON, TaskList),
    gera_permutacoes(TaskList, MelhorSequencia),
    debug('api', 'Melhor Sequencia: ~w', [MelhorSequencia]),
    remove_product(MelhorSequencia, Sequence),
    debug('api', 'Melhor Sequencia: ~w', [Sequence]),
    reply_json(json{sequence: Sequence},[json_object(dict)]).

json_to_task(JSON, Task) :-
    Task = task{
        taskId: JSON.get('taskId'),
        startPlace: JSON.get('startPlace'),
        endPlace: JSON.get('endPlace')
    }.

remove_product(List*_, List).

task_id_to_json(TaskId * _, TaskIdString) :-
    term_string(TaskId, TaskIdString).
