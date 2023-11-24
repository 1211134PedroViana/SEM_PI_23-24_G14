% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
%:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object student(name:string, number:integer).

% Rela��o entre pedidos HTTP e predicados que os processam
:- http_handler('/processa_json', p_json, []).

:- http_handler('/rooms',get_all_divisions,[]).
get_all_divisions(Request):-
    cors_enable(Request, [methods([get])]),
    findall(D, sistema_pericial:facto(_,fazer_divisao(D)), R),
    prolog_to_json(R, JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

% Cria��o de servidor HTTP em 'Port' que trata pedidos em JSON
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).


p_json(Request) :-
        http_read_json(Request, JSON, [json_object(dict)]),
%       R = json([name=joao,number=3000]),
        R = student("joao",JSON.set_user),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).


% Cliente consumidor de json

client(Number):-
        Term = json([set_user = Number]),
        http_post('http://localhost:5000/processa_json', json(Term), Reply, [json_object(dict)]),
        write('Client: '),write(Reply.name),nl,
        write('Client: '),write(Reply.number),nl.