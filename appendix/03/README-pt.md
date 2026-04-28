## Como posso colaborar com este livro?

Obrigado por estar disposto a colaborar! Existem várias maneiras:

- Traduzindo conteúdo
- Melhorando a [seção ```glossary/```](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Editando conteúdo
- Compartilhando seus exemplos de shaders através do [editor on-line](http://editor.thebookofshaders.com/)

### Traduzindo conteúdo

Este livro é escrito em [linguagem Markdown](https://daringfireball.net/projects/markdown/syntax) então é muito fácil editá-lo e trabalhar nele.

1. Comece indo para [o repositório do github em ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Dê uma olhada nos arquivos e pastas dentro dele. Você notará que o conteúdo está em ```README.md``` e outros arquivos com letras maiúsculas como: ```TITLE.md```, ```SUMMARY.md```, etc. Também note que as traduções estão hospedadas em arquivos com nomes terminando em duas letras que fazem referência ao idioma para o qual estão traduzidos, ex.: ```README-jp.md```, ```README-es.md```, etc.

2. Faça um fork do repositório e clone-o em seu computador.

3. Duplique o conteúdo dos arquivos que deseja traduzir. Lembre-se de adicionar as duas letras que fazem referência ao idioma para o qual você está traduzindo aos arquivos em que você trabalhará.

4. Traduza o conteúdo linha por linha (veja **Notas de Tradução**).

5. Teste (veja **Testando**).

6. Faça um push para seu próprio fork no github e então faça um [Pull Request](https://help.github.com/articles/using-pull-requests/)

#### Notas de tradução

Não apague ou modifique os exemplos incorporados, que parecem assim:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

ou

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testando

Comece executando um servidor PHP local dentro da pasta do repositório local:

```bash
php -S localhost:8000
```

Então no seu navegador procure por ```localhost:8000``` vá para o capítulo que está traduzindo e adicione ```?lan=``` seguido pelas duas letras que usou para marcar o idioma para o qual está traduzindo.

Por exemplo, se você estiver traduzindo o capítulo ```03``` para francês você teria trabalhado com o arquivo ```03/README-fr.md``` e consegue testá-lo indo para: ```http://localhost:8000/03/?lan=fr```

### Melhorando a seção do glossário

Esta seção está em desenvolvimento. Estamos felizes em ouvir suas ideias sobre como torná-la uma ferramenta amigável para todos. Envie uma mensagem para [@bookofshaders](https://twitter.com/bookofshaders).

### Editando conteúdo

Somos todos humanos. Se você vir algo, diga algo e faça um Pull Request ou abra uma issue. Obrigado!

### Compartilhando seus exemplos de shaders

Você verá muitos links para o [editor on-line](http://editor.thebookofshaders.com/) e instâncias incorporadas dele.  
Assim que você codificar algo do qual se orgulhe, clique em "Export" (ou no ícone ```⇪```) e depois copie a "URL to code...". Envie para [@bookofshaders](https://twitter.com/bookofshaders) ou [@kyndinfo](https://twitter.com/kyndinfo). Estamos ansiosos para ver e adicioná-lo à [seção da galeria de exemplos](https://thebookofshaders.com/examples/).
