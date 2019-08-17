## Hello World

Geralmente, o exemplo do "Hello world!" é o primeiro passo para aprender uma nova linguagem. É um programa simples de uma linha, que exibe uma mensagem alegre de boas-vindas.

No mundo da GPU, renderizar texto é uma tarefa complicada demais para um primeiro passo, então, ao invés, vamos escolher uma cor brilhante para mostrar nosso entusiasmo!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Se você está lendo este livro num browser, o bloco de código antetior é interativo. Isso significa que você pode clicar e mudar qualquer pedaço do código que quiser explorar. Mudanças serão atualizadas imediatamente graças à arquitetura da GPU, que compila e substitui os shaders *on the fly*. Faça uma tentativa, mude os valores da linha 6.

Embora essas simples linhas de código não se pareçam muito, podemos inferir um conhecimento substancial delas:

1. Shader Language tem uma única função `main` que retorna uma cor no fim. Isso é similar ao C.

2. A cor final do pixel é associada à variável global reservada `gl_FragColor`.

3. Essa linguagem, do estilo do C, tem *variáveis* internas já construídas (como `gl_FragColor`), *funções* and *tipos*. Neste caso, acabamos ser apresentados ao `vec4` que é um vetor de quatro dimensões de precisão de ponto flutuante. Mais tarde vamos ver mais tipos como `vec3` e `vec2` juntos com os populares:`float`, `int` e `bool`.

4. Se olharmos de perto o tipo `vec4` podemos inferir que os quatro argumentos correpondem aos canais RED (vermelho), GREEN (verde), BLUE (azul) e ALPHA. Podemos também ver que esses valores são *normalizados*, o que significa que eles vão de `0.0` a `1.0`. Depois vamos aprender como a normalização faz com que fique mais fácil *mapear* valores entre variáveis.

5. Outra *característica do C* importante que podemos ver nesse exemplo  é a presença de macros de preprocessador. Macros são parte de um passo da pré-compilação. Com elas, é possível definir (`#define`) variáveis globais e fazer algumas operações condicionais básicas (com `#ifdef` e `#endif`). Todos os comandos de macro começam com hashtag (`#`). A pré-compilação acontece logo antes de compilar e copia todas as chamadas a `#defines` e checa as condicionais  `#ifdef` (é definido) e `#ifndef` (não é definido). No nosso "hello world!", só inserimos a linha 2 se `GL_ES` estiver definida, o que geralmente acontece quando o código é compilado em dispositivos móveis e browsers.

6. Tipos float são vitais em shaders, então o nível de *precisão* é crucial. Precisão mais baixa significa renderização mais rápida, ao custo da qualidade. Você pode ser detalhista e especificar a precisão de cada variável que usa ponto flutuante. Na primeira linha (`precision mediump float;`) estamos setando todos os floats para precisão média. Mas podemos escolher setar para baixa precisão (`precision lowp float;`) ou alta (`precision highp float;`).

7. Por fim, e talvez mais importantem o detalhe é que specs GLSL não garantem que as variáveis serão convertidas automaticamente. O que isso quer dizer? Os fabricantes têm diferentes abordagens para acelerar os gráficos que o cartão processa mas eles são forçados a garantir specs mínimas. Conversão automática não é uma delas. Em nosso exemplo “hello world!” o `vec4` tem precisão de ponto flutuante e para isso, ele espera que seja associado com valores `floats`. Se você quiser fazer um código bom e consistente e não gastar horas debugando telas em branco, acostume-se a colocar o ponto (`.`) em seus floats. Esse tipo de código não vai funcionar sempre:

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERRO
}
```

Agora que descrevemos os elementos mais relevantes do nosso programa "hello world!", é hora de clicar  no blodo de código e começar a desafiar com tudo o que aprendemos. Você vai notar que em caso de erros, o programa vai falhar a compilação, mostrando uma tela em branco. Existem algumas coisas legais que você pode tentar, por exemplo:

* Tente substituir os floats com inteiros, sua placa gráfica pode ou não tolerar esse comportamento.

* tente descomentar a linha 6 e não definir um valor de pixel na função.

* Tente fazer uma função separada que retorne uma cor específica e use a função dentro do `main()`. Como dica, aqui está o código para uma função que retorna a cor vermelha:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Há vários modos de contruit tipos `vec4`, tente descobrir outras formas. O seguinte é uma delas:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Embora esse exemplo não seja muito excitante, é o exemplo mais básico - estamos mudando todos os pixels dentro do canvas para exatamente a mesma cor. No próximo capítulo, vamos ver como mudar a cor do pixel usando dois tipos de entrada: espaço (o lugar do pixel na tela) e tempo (o número de segundos desde que a página foi carregada).
