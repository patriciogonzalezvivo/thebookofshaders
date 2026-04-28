## Como executar os exemplos em um Raspberry Pi?

Há alguns anos, assumir que todo mundo tinha um computador com uma unidade de processamento gráfico era uma ideia remota. Agora, a maioria dos computadores tem uma GPU, mas ainda é um requisito muito exigente em um workshop ou aula, por exemplo.

Graças à [Fundação Raspberry Pi](http://www.raspberrypi.org/) uma nova geração de computadores pequenos e baratos (em torno de $35 cada) encontrou seu caminho nas salas de aula. Mais importante para os propósitos deste livro, o [Raspberry Pi](http://www.raspberrypi.org/) vem com uma GPU Broadcom decente que pode ser acessada diretamente do console. Criei uma [ferramenta flexível de live coding GLSL chamada **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) que executa todos os exemplos deste livro. Este programa também tem a capacidade de atualizar automaticamente quando o usuário salva uma alteração em seu código. O que isso significa? Você pode editar o shader e toda vez que salvar, o shader será recompilado e renderizado para você.

Ao fazer uma cópia local do repositório deste livro (veja a seção acima) e tendo [`glslViewer` instalado](https://github.com/patriciogonzalezvivo/glslViewer), os usuários podem executar os exemplos com `glslviewer`. Além disso, usando a bandeira `-l` eles podem renderizar o exemplo em um canto da tela enquanto o modificam com qualquer editor de texto (como `nano`, `pico`, `vi`, `vim` ou `emacs`). Isso também funciona se o usuário estiver conectado via ssh/sftp.

Para instalar e configurar tudo no Raspberry Pi após instalar [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), uma distribuição Linux baseada em Debian feita para Raspberry Pi, e fazer login, digite os seguintes comandos:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
