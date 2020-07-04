<?php

	$path = "..";
	$subtitle = ": Shapes";
	$README = "README";
	$language = "";

	if ( !empty($_GET['lan']) ) {
		if (file_exists($README.'-'.$_GET['lan'].'.md')) {
			$language = '-'.$_GET['lan'];
			$README .= $language;
		}
	}

	include($path."/header.php");
	include($path."/chap-header.php");
	echo '<div id="content">';

	include($path."/src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents($README.'.md'));

	echo '
	<div id="product-component-1573172983507"></div>
<script type="text/javascript">
/*<![CDATA[*/
(function () {
  var scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: "pixelspirit.myshopify.com",
      storefrontAccessToken: "686544ffb4b575bec76a775b422b5d72",
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent("product", {
        id: "8723521601",
        node: document.getElementById("product-component-1573172983507"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0",
          "margin-bottom": "50px"
        },
        "text-align": "left"
      },
      "title": {
        "font-family": "Baskerville, serif",
        "font-weight": "normal",
        "font-size": "26px"
      },
      "button": {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": {
          "background-color": "#000000"
        },
        "background-color": "#000000",
        ":focus": {
          "background-color": "#000000"
        },
        "padding-left": "26px",
        "padding-right": "26px"
      },
      "quantityInput": {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px"
      },
      "price": {
        "font-family": "Baskerville, serif",
        "font-size": "18px"
      },
      "compareAt": {
        "font-family": "Baskerville, serif",
        "font-size": "15.299999999999999px"
      },
      "description": {
        "font-family": "Baskerville, serif"
      }
    },
    "buttonDestination": "checkout",
    "layout": "horizontal",
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "description": true
    },
    "width": "100%",
    "text": {
      "button": "Buy now"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": {
          "background-color": "#000000"
        },
        "background-color": "#000000",
        ":focus": {
          "background-color": "#000000"
        },
        "padding-left": "26px",
        "padding-right": "26px"
      },
      "quantityInput": {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px"
      }
    }
  },
  "cart": {
    "styles": {
      "button": {
        "font-size": "16px",
        "padding-top": "16px",
        "padding-bottom": "16px",
        ":hover": {
          "background-color": "#000000"
        },
        "background-color": "#000000",
        ":focus": {
          "background-color": "#000000"
        }
      },
      "title": {
        "color": "#4c4c4c"
      },
      "header": {
        "color": "#4c4c4c"
      },
      "lineItems": {
        "color": "#4c4c4c"
      },
      "subtotalText": {
        "color": "#4c4c4c"
      },
      "subtotal": {
        "color": "#4c4c4c"
      },
      "notice": {
        "color": "#4c4c4c"
      },
      "currency": {
        "color": "#4c4c4c"
      },
      "close": {
        "color": "#4c4c4c",
        ":hover": {
          "color": "#4c4c4c"
        }
      },
      "empty": {
        "color": "#4c4c4c"
      },
      "noteDescription": {
        "color": "#4c4c4c"
      },
      "discountText": {
        "color": "#4c4c4c"
      },
      "discountIcon": {
        "fill": "#4c4c4c"
      },
      "discountAmount": {
        "color": "#4c4c4c"
      }
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "background-color": "#000000",
        ":hover": {
          "background-color": "#000000"
        },
        ":focus": {
          "background-color": "#000000"
        }
      },
      "count": {
        "font-size": "16px"
      }
    }
  },
  "lineItem": {
    "styles": {
      "variantTitle": {
        "color": "#4c4c4c"
      },
      "title": {
        "color": "#4c4c4c"
      },
      "price": {
        "color": "#4c4c4c"
      },
      "fullPrice": {
        "color": "#4c4c4c"
      },
      "discount": {
        "color": "#4c4c4c"
      },
      "discountIcon": {
        "fill": "#4c4c4c"
      },
      "quantity": {
        "color": "#4c4c4c"
      },
      "quantityIncrement": {
        "color": "#4c4c4c",
        "border-color": "#4c4c4c"
      },
      "quantityDecrement": {
        "color": "#4c4c4c",
        "border-color": "#4c4c4c"
      },
      "quantityInput": {
        "color": "#4c4c4c",
        "border-color": "#4c4c4c"
      }
    }
  }
},
      });
    });
  }
})();
/*]]>*/
</script>
	</div>
	<hr>
	<ul class="navigationBar" >
		<li class="navigationBar" onclick="previusPage()">&lt; &lt; Previous</li>
		<li class="navigationBar" onclick="homePage()"> Home </li>
		<li class="navigationBar" onclick="nextPage()">Next &gt; &gt;</li>
	</ul>';

	include($path."/footer.php");
?>
