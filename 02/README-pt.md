## Olá mundo

Geralmente o exemplo "Olá mundo" é o primeiro passo ao aprender uma nova linguagem. É um programa de uma linha de código que retorna uma entusiástica mensagem de boas vindas e declara as oportunidades que nos aguarda.

No mundo da GPU, renderizar texto é uma tarefa muito complicada para ser o primeiro passo, portanto usaremos uma cor brilhante cor de boas-vindas para representar nosso entusiasmo!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Se você está lendo este livro em um navegador, o bloco de código acima é interativo. Isso significa que você pode clicar e modificar qualquer parte do código em que você quiser explorar sua funcionalidade. As mudanças serão atualizadas imediatamente graças à arquitetura da GPU que compila e substitui os shaders *instantaneamente*. Experimente modificar os valores da linha 8.

Embora essas simples linhas de código não parecem ser tão interessantes, podemos inferir muita coisa sobre elas:

1. Linguagem de shader Shader Language possui uma função principal - `main` - que retorna uma cor. Isto é similar a C.

2. A cor final do pixel é atribuída pela variável global reservada `gl_FragColor`.

3. Essa linguagem similar a C tem *variáveis* nativas (como `gl_FragColor`), *funções* e *tipos*. Nesse caso vemos `vec4`, que representa um vetor em quatro dimensões com precisão de ponto flutuante. Mais adiante veremos outros tipos como `vec3` e `vec2` além dos populares: `float`, `int` and `bool`.

4. Se observarmos o tipo `vec4` podemos inferir que os quatro argumentos correspondem aos canais RED (vermelho), GREEN (verde), BLUE (azul) e ALPHA (alfa). Também vemos que esses valores são *normalizados*, ou seja, eles vão de `0.0` a `1.0`. Mais tarde aprenderemos como normalizar valores facilitam o seu *mapeamento* entre variáveis.

5. Outra importante *característica de C* que podemos ver neste exemplo é a presença de macros de preprocessador. Macros são parte do passo de pré-compilação. Com eles podemos definir variáveis globais (com `#define`) e fazer operações condicionais básicas (com `#ifdef` e `#endif`). Todos os comandos de macros começam com uma hashtag (`#`). A pré-compilação acontece logo antes da compilação e copia todas as chamadas para condicionais `#define` e checa `#ifdef` (está definido) e `#ifndef` (não está definido). Em nosso exemplo "Olá mundo" acima nós inserimos na linha 2 se `GL_ES` for definido, o que provavelmente acontece quando o código é compilado em celulares e navegadores.

6. Tipos float são vitais em shaders, então o nível de *precisão* é crucial. Menor precisão maior a velocidade de renderização, porém a qualidade é afetada. Você pode ser meticuloso e especificar a precisão para cada variável que usa ponto flutuante. Na primeira linha (`precision mediump float;`) estamos ajustando todos os floats para precisão média. Mas podemos ajustá-las para baixa (`precision lowp float;`) ou alta (`precision highp float;`) também.

7. O final, e talvez mais importante detalhe é que a especificação da GLSL não garante que as variáveis serão automaticamente convertidas. O que isso significa? Fabricantes têm soluções para acelerar os processos da placa gráfica mas eles são forçados a garantir as especificações mínimas. Conversão automática não está entre delas. Em nosso exemplo "olá mundo!" `vec4` tem precisão de ponto flutuante e por isso ele espera ser convertido com `floats`. Se você quiser escrever código de maneira consistente e não gastar horas investigando telas em branco, se acostume a colocar um ponto (`.`) em seus flutuantes (floats). Esse tipo de código às vezes não funcionará:

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```

Agora que descrevemos os elementos mais relevantes em nosso programa "Olá mundo!", chegou a hora de clicar no bloco de código e começar a aplicar o que aprendemos até agora. Você notará que, quando houver um erro, o programa não compilará e renderizará uma tela em branco. Têm algumas coisas interessantes que você pode tentar, por exemplo:

* Tente substituir flutuantes (floats) por números inteiros (integers), pode ser que a sua placa gráfica não ofeça suporte.

* Tente comentar a linha 8 e não atribuir nenhum valor nessa função.

* Tente escrever outra função à parte que retorna uma cor específica e a utilize em `main()`. Dica: aqui está o código para uma função que retorna a cor vermelho:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Existem múltiplas maneiras diferentes para construir tipos `vec4`, tente descobrir outras maneiras. Este é um deles:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Apesar deste exemplo não ser tão empolgante, ele é o exemplo mais básico - estamos modificando todos os pixels da tela ao mesmo tempo e atribuindo a eles a mesma cor. No próximo capítulo veremos como mudar as cores dos pixels usando dois tipos de entrada (input): espaço (a posição do pixel na tela) e tempo (o número de segundos desde que a página foi carregada).
