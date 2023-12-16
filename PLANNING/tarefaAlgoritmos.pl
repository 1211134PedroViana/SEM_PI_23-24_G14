tarefa(t1, entrega, Orig, Dest).

calc([T1, T2 | Res], Eval):-
   tarefa(T1, entrega, Orig1, Dest1),
   tarefa(T2, entrega, Orig2, Dest2),
   calcTemp(Dest1, Orig2, EvalA),
   calc([T2 | Res], EvalB),
   Eval is EvalA + EvalB.