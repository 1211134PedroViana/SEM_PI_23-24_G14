% BC - Ligações
liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

% BC - Pisos
pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).
pisos(d,[d1,d2,d3]).

% BC - Elevador
elevador(a,[a1,a2]).
elevador(b,[b1,b2,b3]).
elevador(c,[c1,c2,c3,c4]).
elevador(d,[d1,d2,d3]).

% BC - Corredor
corredor(a,b,a2,b2).
corredor(b,c,b2,c3).
corredor(b,d,b2,d3).
corredor(b,c,b3,c4).
corredor(c,d,c2,d2).
corredor(c,d,c3,d3).

% BC - Salas Edificio A - Piso 1
salas(apn, a1).
salas(beng, a1).
salas(k1, a1, 16, 2).
salas(k2, a1, 19, 2).
salas(r1, a1, 12, 8).
salas(r2, a1, 20, 8).

% BC - Salas Edificio B - Piso 1
salas(b101, b1, 2, 4).
salas(b102, b1, 2, 6).
salas(b103, b1, 5, 4).
salas(b104, b1, 6, 8).
salas(b105, b1, 13, 4).
salas(b106, b1, 16, 6).
salas(b107, b1, 19, 4).
salas(b108, b1, 19, 8).

% BC - Salas Edificio C - Piso 2
salas(c201, c2, 4, 2).
salas(c202, c2, 7, 4).
salas(c203, c2, 4, 5).
salas(c204, c2, 7, 14).
salas(c205, c2, 9, 10).


