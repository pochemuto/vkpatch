/**
 * Модуль редактирования настроек
 */

vkPatch.plugins.add({	
	/**
	 * Описания
	 */
	name: 'settings',
	title: 'Настройки',
	desc: 'Конфигуратор vkPatch',
	
	settings: {
		bool:      {category:'settings_test', def:true},
		num:       {category:'settings_test', def:200, min:1, max:500},
		floatNum:  {category:'settings_test', def:200, min:1, max:500, isFloat:true},
		str:       {category:'settings_test', def:'Test string'},
		list:      {category:'settings_test', def: 'two', list:['one','two','three','withoutTranslation']},
		buttonPluginMethod: {buttonHandler: 'buttonPluginMethodTest', category:'settings_test'},
		buttonInlineMethod: {buttonHandler: function(){alert('buttonInlineMethod ok');}, category:'settings_test'},
	},
	
	resources: 
	{
		tabIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBElEQVR4nHWSa0iTYRTH/+/zbm6+28plS0OXNS276C4GlYhFXr5U3uhKVBQVBUVB0AWKDAqxL32R6CLdPkVElKJ0EZdOKbJlK8t1WTedkbm1ze3Vxd73efpQFpr+4cDhcPgdzjl/YAIVF+ZpAcCSlUEKli3WTNTHj1d01J2oObjDdn1A1N/dWJK+smqfya5JMH1tdrxyTQgoW7VcqD668YBal/Qhz6rbMGNazGzOIIWWDLpKUA5O6nz707k4Jy20pSK94ns4sdPr7WMAwI0Abl4+eHhNUVJ1RAyFhLhhLWEiDyrid0QgDg2F1XxETRBR7D+XWVxzsaEZAMgIoK7Jcy0S/h7SxgUmE9nPQ/IDku9P+KFRDOh45lM63/BdX76hY9QK7bf31OTbVBuMhmEzR0MENAj3p+EPt1pIbfdn+syYODA7nv8hQA5BrRB5S1rQajNnJjW2fO3A0rwcbbR71xB7t4kxdwVjr4tZd2OBp7ysxDgyZcfmIstwuyDSx3GMtquZ7IhnT67MclqtVgUAYOfW8pwvLSves1f5jL20sXOnCqvHXvts5aL9cls8k1sF9uBspn3t6pI5AECy588gBTniQn28T/93X1VEPRZgNvrnQSJgEsFMvZg8NzliBAA+w5QmnN4t2gVlYBJoEKCDSNX7Z4fJ0vtO18d+ALhw3Lau1NpTBZlwkHkkqGMGTRxd4PSmXuYAoOpI0TaNKpqyvfD5IUEZ04FyiP5UDrl7Ex1alaRLnzqYC8oRUILXfXqP/W3K1d6AtutM7b36vz44tneJpXK96ykBlKAEoBwYJYDM/cspB+8Pbc+BW9nW23WNgVE+MBqkXEKJwumZ/tIfEnxM4gGJgMkETObR3TfF4/XrevSqWFJyAmf+z8reoKHT7ctuu9NhOGlJjVin66Lz7e7Uh0zmowmqmOFGp+nMeUfK9o6+lKZHrt62/v5+BgCKEYDL9YK6XC+aAWCFJbeVSvzMS+3pu02JYWPpgm+nvUFNV33D3QCA1rEfGldZWVmK8fKx+gVkCk2ZX8BevgAAAABJRU5ErkJggg==',
		rabbit: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABKCAYAAAAG7CL/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAKD9JREFUeNrsvHm0ZWd53vn7hj2dc+5ct27dW/OkKk1VhaTShAYkWQYDwXbwEHCMwYSYxCuxk4bglY7tth0ndqcTksZ27CS2YzqO0wY6cssDxAZkA0ICgUqoJCSVah7vrTufc/b0Tf3HPlUSRrpVSPmz91p71bp1zj7n7Ge/3zs9z/uJEAL///Hth17rxZ96909z1603sn5mgudX53jiha/wiS/8EcvL86A102NDvHl0AqknCMFDgCJ3eP/SZwjAA8EP/niVQwhwxvPk46cpKot82ZsFgmW67Lh7M7vu2IapLPy156mkZGRxicNfe5Yojnjbne9nd7wNWyu+Ofs4O27cz9DMOop+WNdKxFRdlfOriwuzsRLM95f5mU9+jOsmLW/aDrW7AjCXDucdWZzwb//OL/HBB3+M/+13f5nPHP4rirokBI/zjhAszgScEwghL9+s99AtPc6vbZlSCvJuRfnXQLn8OpJnv3AcqRQ7bt2MKe23vcc6g5Kan3z/zzIqtnPxqReI1Ah7D+wfvfnuOx4Ymxz9LlsVd9sq3yyQS88/f+zD585c+ETfVOADSkMSA/YqgQHw3rNadNkyuYkfv/Od3Lr7DTx64svIlTmGOuO0W8NopTl6/ARllaOVxnnolR7rAkJcxZfItd8kgWceeREhYNstm6mr+rLlBO8RQvDu7/t73HnL/Xz90cNkIx1ueeCOHx3Z3frQ6W8+u+/5Q49TFn2qoiZJo+H2ug2/UJno4eXlquSM50IBX+qC898BMJeO2tb0ypxrpreye/MupC+InGB5qUuSCIbaUzz65ON0yxIhJAGBEFf2Y0IKuos5obnild8zOA9//kWEkOy9ZSfehuaa4Nm/+yDXbj9Ir7vK3W+9hxT5S+dPP/PPHvm/D9GdXwEcIgSKXk7VStm29/q9zqs3La60P33jQUV/2Yp+QZDqapeS81jnEEIiRMA5T16WOGXYMDaKz/tYZ6D2zGyY4ca9+/i9T32KSClGh1qsnxzHr7GUhBTMnVriwuklJHJtABF4Ame/eoEPvvl9JHGC940Dk0JSVDlplqlY1b96+LEn/pcjj30Vqpy4lWCCR7lAZku8h3NnjgqRjr45HZn59PatN3CuPhTWX2x84prAhBBwzjExPj69bWb7D6ZDYdh7a+79rtuwQtnZ+cVv5Msrf7W6bKpL0S0Ej3eeU7MLxMA5wBjH8FDrFcERUtBfKrlwavkVfcurWY5UEoVCCYUYrNPa1KRpokez5D8++8hfvvfIE0+jaoduJ421GItUiqyV0Kssi+fmSDdERJ0Oe7fezdnnvkFdeQJXtJjA+qn19+y4ZvrjZ8+f2Pr0889gTEGatWi122yZmKS1Y+ZrZ08Mf/TrX3nq943J0frSE2w+PAAvHDv9qnbggZSIjBS/hpU4LA4QBBxgrMVLAVIOrNoxPLqO667b9Ysnnv7Ge08deh7T65G1M1AOYS31yipqqEM0OkziwWUps8+devTMs2cQWjIs2jjZRVwJmJmtG7du2zH5r5/9xuNbTx85jatqfPBIKYilQobAxPrJmzfv3ftfHvzue7//0KFDHz57bvb43p3buGXXdr724nHSgdN8tYWkRcT6ZDsiiDVtRNGlpkIIQVlbds5spdNqE0Lj2KM44qab3/DDvlj9mWNPP09vaZF2pmlnIDUUpUOkmrjToSZCJooQpUsnn/j6V08dPkocJwy3RilNkwqsCcye67bf1u0t33Dh6EncUo9Ya7wEZQUK8M4ye+QMC6cuMr1n8zuv33vNza3O8N9dmDv357/8j3+Sf/N7/43PPP4EMWBeFRgYGZpiLJ7E+cYmhAiIVzExZx1Doy3e8aO3k0Yaax3GOPa/4Yb9G6fHfuPrnzkk+hcvMpJAK5VkWtAra7qmYmRyAtUeol8FnPf0e9VTeV6daU+MIKUkCW060YbLEfBVD6XE2MrqauorRyoFmfZ0Ek0aBDJ4kkyTJZqwWnD+8Cme//rhbdPrJh7asnnLe6z3vPvtD/Lj73gzXmvCwGr++mm84cmFL6On5lm/q2Ldrpx4yGCtxwf3Lae1FqHg3u+7jmxUstJdZaW7zOjE6Nju7ds+fv70qfGVC+cZ0ZbhlmZkuEVlPUvLOe32CMOjo2ipECZgrWNucfaF1XjVhg0Ctz7gpjxufXOuCcyXvvjFv+r1es+qOEXGKVJHhBCoq5w0DmQ60Ekl7ZEUaSu6p05z6huHWxsmJn536/Ztfz94zxuu23PZ57zaYb1FD/cZ2eAYXm+YuqYiG3Z4J74lECACBx/Yy9D4MMuLNf2+A2JuvmXfP+8tL+ybO30OUVZ0tEIqwWpZsdjLibI2raERvJd4BzbUJK2MlX71+TA2Qhgffdk5QhgfWRsYV9ffPHXq/K/pdgeRZCidoXSESmOCdWg82JK2gqGWIJaOlQuznDxyXE5v2vzrB2695Z+kSczN1+35lohy45Di1omIW8Y1B8cVt2wcYajdwRiPswKpA1N7ysvghBAwlePAHXvYde0WTC+AUZi+57ZbD94/2sl+4vz5C9hun8g7VKpBCvLc4IgZWT9K1I4wLuA96KEMn8UXT55aenRu0TO34L7tXNPHRL1Vzh8pPrF+/MDPxbHeEGpLFCXoTkxvcQmloBVnqABKaaJIU+ae7rnznDk2zMY9O35VeFF36+6/nZpug1SsPvYMNw1XjI0neB8Q3lKMjHExSQjODrLYxmFO7SmZfSFj9aJj54Ep9t65AetyRAuMNWzbviW59trtv7Jw/owyucWv5lA5aiEwxlCVnsnpdSRphPMGpRLKyqBbGV0rnnZL6sxo1Ua8Qsa9dh7TL8m7xfzC/OLD05PjHwjWI5WkNhUkKd1+RcgMnU6KshKcoSWg3+8zf+ocKk3ZvHnbR2/ct890y/zXRYBnnjpKYQsyFwbAQOV8E11e/t0eEJZdN8e88a63M76hg4wEwYVBXeS48brr3x9MfjDv9qnqkridwNgw3XMLrCxXdEZGSRIQWKRVGCxBK9KszfkzC18NLvZKx6+Yaa8JjFjXRjrHhcX5P5jeOPN+VxhZOw8iMLquQ7Us6ff6CGlJkwgRaeKWRVhwpqS71GUhW+L2W+74aLHsj3zxM5/7H6Z0kAaCtQRvwbnLlvLtCaakdiWtKUWIBbV1A1Asm7ds2TQzNfm/Lp29QLfbR6hAiDUlhrqAVtomjSJcFYjbmuAlAYXOWuSloZfXX969fwvyVeqzNYHJRwQBReWLLxvrnmt30uvqXp9ERQjvSNIIEYbo9nOcCaRtjdASHTSRjAk20F/t0810dPcbb/uN0+fO3X7iySfnfadE796GkuMIPM6rbwHnUsEppaDs97lw4gzrpzdirSX4gFSK7Vs2/ZLPi5ler8B4R90vKOdXKJa6eOHptGOUDAQHAo2XAq9jdJLSr4pz3vuvZUlAyPCdA1OVE9Ck9OWF+cWH9myeuC5fsQjnwYGWgqyVoJSk31sh9Bwi1hhvEVVFai1VVTE7N8+mTdHOBx6491+dfuHI+7yYZXTbbURqFCkkcuUiS2cOD1J7gXOCSwvLBsv42Ho2TW3CWIO1jumt0/uGsuRd1dIyzhhMVdHPe7gip1juksYSpQTBe6SUVLXDRxnEGhMM3vsnyauzao2qf+2lVDRPUfnA8bOL/37X5um/k2XZ+rrbRyiNFJ7gDFEsyUYyivkSDLTGIoTylPkqKlJYrzl/YY5tW7a894G3PfD/PvKFx/97vxacynOgJotq1u3ciRBNbpN3g3A2hEAg0hFZMkR/tcA5S5KlbNo687O2KJJ+v09RFpT9gghBWeZIb5Be4mqPEBopY0KQICROCkSkWTgz/8hTjz0blJKv2jxbM1xHwRIFSyocvdX8zMkLK78WDw8hk4yydriBIwymJkaRdTJyV1MVBmk8oa7xVQkuUOaGpeVlbj5488d27d6yyfqK+apLWT9O1noKK1epgsYESdRSZEOarKMYmWix1Fvi9OxpTpw7SWdd+4441n/T9iusCNS2Jo4ibFFT9Hp4W2NrQ1VYbJBUHrxQeKUIStFqt83K3OpXy77BlB5TvPK5tsWI6qUsWHiOnDj+W9NT+/9h1G6tq73DOot3NSoEQhmQGtJUY3PXdNPiBKzD1jUqUqz2urSG2xv/xtve/muf/OQff//s0uOh1ktIMYYix4QxjPcoCLn22ODZODqEEwbjHSpRbNk284GQV9I5h3UO7z0+eLwPxCqiCiCCQuqYS91UkSSIJEFLQfAcHR1uP3P3vQdeMUxf1VLqF9/68upsOXf2/Mrv7tzQ+bB0GfSrpt0lLTqWWOeIdYRznl5Z0a5jYiw+eIypcXVEsZozvWXqe2+/7aYPnZo79q98R9LNDTJ0Wd+OWLKeRW2YSwyewIZiFV0Zyqpi1zW7N4wMj7zDLS/hnMV6B1ISJymu3SIPnjiNEEFQW0vSyYiyGJEonPBonbKy0nuUqj3fTkYIr7UZ3lbfeqkjcPrEmV/buenAB4jDqC0cmojgPUF4ZKQRToC0VNbS75foYUfaUVgpcM5RlBXLSyvsu3nvzx+/cMenn33uiafni6M4Y8SmIRXq2HM+romQ2OCZCwVb1BBBWfbv2/cugpsItiaEgLUGKSUhBHr9VZyrUVpgLIg0RiQpRAlBSIIAnSVc/OaJv1h9cRYd69fOEmjl/9rfgtWVlVPn5uY/tXF63futaxpGGImrSkxtiIJEa0WSxZRVhSsMap0ibrcRUmGDo6xqyl7Rvv+eN/5mMOaeyhp36GvfwGxdxPQXOHV+CecDlTW88aYH2TWzi/GZiYnN12z5adfroazC+wrnDRDo9/oQBFIoytzio4S4leIjhYgSoihGR4qqtsfOnDj3GetLhBGvHRjxSh03Hzh58vzvbN268cdtnAu8JkkUDokVDWtQe4+KFDExdVUhA0ghUVojlcB7T9F3jE6077z/vns+MrNpy7+ocxlKX7Bt3SjnvOb8ap+PvOt93DS5naKbs+uWPf9ay7AlVAYTHMaYhlko+iCasIyXuCDRQx18HCPiCJFEWA9plnHk60f/8+yh5UUdRVypWbh2SfAKVyulWZhbeuziwtKXJ4fTOx2WqqpRaYyKNK4q0EAUQClD7Tx1acg6AYJHCNU0HJyh6peMrF/3yzPGDN98060/c811e5Ba88OtEc6eu8Bdt91OXvcRkfrFpJX+WOjmCKUpTIk1JSIITFkgZCDRESbJoOMwSqC1JMpSAOIkYmmp++zTX3rk10O0jFPq9RFuIqpfGTBr/bFjR//l9O0HHzZllyAlxBCsQIaEYCzWWJSISGKJMRZZGxItUEFCCFhTY6xGVyWbdm35yLr109HS/Or/sdJdOq+EYLTVobDlnelw+4NE/Kh34NMEqQKRtURVQTcvSdIEg6Bv+4ishdPggiXVMUFIVBzThzMPPfyFdweTL0aTihDE6wNGV+5VLhLMHjv3xy9MnP7Ezm1TP1iHgPQCHywyljgdEWRN2e0RxxmEcJmpFFLinMepJrwqofHOkY0P/WPdSv9Wpzf020LIat3M9L3ZyNCDQXgCoeGclIJIkSQJE0MdRDSHKUoWihLdaVEaiy49KgREFDW+JWvN//GnH33XE4eee+rObRnBGeB1AiNU59UvFIFvPnPkA50RvW5qePK+ql+gYo01gVB7ZJqQxJq6mxMLhZIKBHjnCRqEVqishUxSgkoIQaHTaGY4HfnZpuXd0CQCgSAQhEESIEAQApVGrFs/Qb6yQlkbRFtiXMBJ8CKghSAdGuKRw8d/6sWzy18c2zBNkUkINVdBc12hVprL12xQW8zKYw8/9u573nrfn4+ta91Q9UsQEikjAgE9NoRE41zAhEAkJd5ZYtkizlqI8WF8lkAQzYlqnmYQIEDgLzHfEDwBhxAB7y2hLpG1YWLdBFVZ0V3pkWYxXrbxxhICPPfs0d89/ZnD/3WHUKhsDNsPRFOKOPEQXgcwF1/4AlfinZRrX3hqZMtbrr1z66fWTw7dVpo+Nnh0HKFbGSDxAZI0JY5jdCSQUcTw+kl0muAIDecjGhshqMZOggfxMiWA8BAchNAsTWOx/RIfAmkrYe7CeYICQ8BWhlrpQyfPnflnYyMWrQRgke02PjEEW1zmol5bVFp/8orMl3CS7gsbzh5JR9/Rurf138bWjd7XXVjFEoizFBdphLG02i1UJFAasuEOMo4IzjZpufCD+w8DSxFNp0qEl/kDi8Q3BmQ9CiicZTXvIZRGJxn9lS6+qrm40j3x5WfO/IAsFs9NbPcYmRNCB6UnYGUWEQTh9QCj7BWIfgntZc/o8c+js/G5s+Pybd3p6Bc3bt/8ISpDFEUEJZBK4ITDeUGKot1uI4xDBN+soFgidGPdYtCQCY1JQnCDleUQLhCcQzp/mXsp8hxTWaSKqMsaFRRffPzQz//+nz109M0P7mbb7hmML3GrMX5BcLVyoDWBuebZK/GUoB1IKekMdUmyqnjmuVMfPmf9oZs2z3zMEsYQglhrIqVxeOI0RSmFzytEJAlKQFCIAEINXK4UA/4xIAY0MSHgrENYD8YSjEGEgHKe8wsLzVLNYparfLmsRj9343Vv4cAtOcZYlFKo0MJHEqsU/vUCE5krf0AA5Ogw7YO3ApasnXL48Iu/v/zc84fvecuDvzM81L7JCU+wFhVFJEkLYzxVXiG0otNKBpFGAU16ENxAEnLJ3J0H7xHWI7xv+HHvCUKQdVLyIwV1JZCJpCxWL9y3XS3fv30Hi/ZFXKvLyeMpxw4ZUnmMabEktk4NBR9ej4/h6oBpkj6HUHJQU0kuzs4+9Sd/9sj3PvDAnY/OrB/bXFYGFQI+QK+XszS/RNSK0dE4SRQTvAHTBGchBZKmOAwhILwH5y//i2uiilKK0eERsjjhS3/5ZQ7cfgN2mUeL+aqnVElsh3jyYsUn/zTD5iX0rNixg7B7SOD867CY13I0fTe4mBu6x8+ciR5/6r0/8PY3/YkSPk2SBK01S/PzPP3EYXbuvYYNk2NIJQjOI7wgSEEIAnfpl4eB3/EBfONjLqkmpAR0xJ5r9nDoq8+CF+7Jrx3+1O999nNkcYKOU8TGXWxYJ0EbsXyxx8XxMWb7vL5w/Z0eSkmWVguWl3MYGmVEKU6cmf3c3MLKk9unJ+6I4wgpwJaWpx5/gTQe5vqbdyKCQLzMK4ZLGZhvlhBCgg94a7n0qJuoHTDWMTSW8b0/9D2cn511uzfP1N9/xwH+9EufZTgd546bN/P8iXOQliHr5MJ3ZkFeeS3I/1mgCAHGB86sOrq1pCQht4qlHA4fP/87MkkIruGlrDUcefpFVpf76ChquKIQ8ME3luMCwnhCZXG1xdWmsRTrcNbhrccHcI0R4fCsnxnj+hv2xvd+35sfHEsTamB63Sg//N33cP2OrfRLS3AmQB/Ir3j+T7OYcPkpghaiQVwIEq059I2j/3nfzi3vfMPeHW+JIsnGzVNs3j3Jruu2gZYEY/HBIV5W0QfbABFoyocgB18AeO9wAwfsg2/iVxCkiWbndZvfd98P/o3PzxzY8+kbD1xD8PDgwf3otObhr3wRzdXFa7GWzvdXr0JRGAA9PMzUP/j7lEHz4twgO31ZoeasZ/26zt73vOdtj0/NDA174zjy3HG2XbOLtKNwlScEB7ZxqoFwuZ8rlUJHGiEFwgdsbbHW4kPA+0YxKoQgjmK0kkipEDIyq73ub589f+Zjx49efLbXz1nfGuIPPvvnPDX7FSIdvb5wfbWyL7KUQkWYABvWK6R4ybcJwDlIs3A0G2rNCxUNewO7b7gWFSuCq4GGrvXe4QeAhABCSVSkkXogJ/NN/9iHRqEZvMP7xqq8dWitieKIKArR+Gjng0OdPX+rruRPHXnxxMdB8MA1NyJPL6G9fn3A2Le886rAseunuNiT4Ny3E1gBVGo5eGDvXSPrxzd7a1CpRkqB92awDMBZ28jHfMNjSwSxUig5cLyDOkkiUELinMMaexm0qqopy5Isy3A2wRmIomh0376dvxHFojd3dPH/6ZcVNjjEVbjWtYHZu+/qzMZZKGpeidZz1rF5Zoqbb7vlIwgfeSWbIONNc7PW473FDazFeddkwVojAnhj8QOqJAwqdCUFBEkWJ8hYN74sTijLkn6vTxQbsiSjrgqilm7v2bnt4y016p/4ypMPWWObNujlSBq/Yn9mTWC27xh/SbTzGg9rLW+84/YfaI2MPuht1ajGvWsyWRdwprEU6xrnK31TYiRRjBYSbx11WVFVFUIKQqTRUUwUReiscaW1NQQCURzR6rSw1lDUfbRSuCLQjnR70+axf3PzXfu/unHb9Nk4ji//vt7ySZyrv63aXhOYDVMTly+4kirqlfXBjonJiU3X3LD7Y8EYKRFNpPE1riyoTI2znhAkQgriOEIljV9RSuEqQ9EvKcqC2tSYuibSEWm7RbvTwQWLcxYfJNY6fPAorcnLgrIoyVoZiZT0Qk4Sx9v33rDrN0fane9VQnqpNL3VWf7yyf8L5/og1dUD8/BnH8I5y90H72X7lp1Upr5KJe4gfHvPtdfu/ZCUYYO3NYTQ1DvOUjlLVRvkIKIgAlo3PiUMhD9Fr2BlpUdR5uRFD+89OopIrWFpYZnZC+eIWzEbpmfQUdo4bBGQotGJ9rpd8AEtmpRguKXfPivdOxYWFh+KkxZzpw5T5CvoOG6SoqsF5sL8ebxzfP7xz5IMDdGJs6bSvZol5BwbZ6b3DI92fhxTgTd458E11bK3gUjHSNk40kAjQHS1Ye7CLEVRksYtXG3pFzm1MU0pUFrmLixz6Imv0i+73Lj/BnSU0u6MNJEqBJQWxHFK8J4qLwlxjPGeTKbIVvbBk8+/+EdRnIWLpw8jhfjOfYxWGqk05xbn+djDj/Cht94/6LiFK5qL854NU+t/BO+HLjnV4DzOWPKypqoq4ihCKzXovwSqoqC7vMq5s2d5/psvsLrSZ2JskqmpKQiSQGBpeZFHPvsIyyuz3HXfnbSGO6z2exgnyNIWUgqKwmJsl7SVoJF4b1BRBL7PUCs9kETpZN5dnMsXnkPK6LXnMWka8xdPHefCzV22bp2kNuYKkyqBTjvVk2PD3xOsJVy2FI8xDu8CgoZWMXXTn1UyUNYl/bIPSjAy2uHs6dN849A3aGVDjA6PUdeOI8eeozMUcd9b7mXntdcwlAzT7xc438UFSxzFRFJjTE33YpdWlqGEREeSJIkRIRodHtIbQt2fCy4nSIl4hQd9VcBIKah6JV947AT33nUTq73iisC0W+kOHcL1wTepuzWGyljcINfRWlHXpknvHWBryrqirhxpO2P9xil0rJia3sCZM7O8+OIRut2ca2/cy62338jM9DZUklD2Snp5RewCCkVwUCtPmrUxpaW/mhMnMcoKnAMpQpJFfiRZP8PK1F7mLnxtELJfY+arkoiHPvMYH3jvW5mcGMWYV/c1PgSyNJ3wLmReWCpjqCuDHfiJ+lJa7x06irDOYk1NbW2TATuJUm2GRzSENnE2jhURRV5w3b4DBJGysJQjZEmd53jhkVJRC0PwAicM/V6f1aUlamMYmxin1UodVa2UwrrKlr6umN58kPmLT+EuN8dfkilePTBasdKb47f/4C/4pz/9w1RFvSYwsXHdypoq+JBY4zCmAcMYS6+XUxQFURwjRYmn0dZZazHW0e8VlEWFtYHSeFZ7BUVhWVrusrCwgvMS52RjyXmJ9YbQDoBERJpIRxSmpvKW1bxL5W2YHB8L7SxBKT9XGXHRGVCtaWZ2vZOi7DaRTDmMq15LrZTw3//kC7zvh97E5MTIq1pNIOCtuZiX1ZJWcoO3rnG6eU5d11SladQJCKx1KK0IwWGNp9fNCS6gRYTDNWIB7+n3+vS6OUsrXaz15O0MrTW2qvC+xjpHWRtWu6tkSUoUR/gQSNKUuqpCt9tFeo+Owmpb9pdCZEEIdm3Zg5QC6yWnSoGpu68FGMXyyjwf/8PP809+8m/Sr8tXDHWDTLm03pa19YggKWtDnld476iqCpA4f0m1ILHWQgiUZQkevBesrubMLy9yZvY8y0WXblXQXVnFlyXLKxKhFIlWaBUoTUmn0yGLkuYzlWR5eYWVlRWmpiabpeYcweYL10aul7Y1Qjb5jsLzzZ6ltsBrs5jGaj7x8Bd51zvvZ2r9OoyxL9eINDcIeCGiypi0Icma5lRdlfT6ffr9PlVliJOYTqfTsAbOUxY1VWFxwVHVhvmlZc5fnGNhZZmzi/McP3GKnq/ZtnEj7TRDSUkWRygVSLMEZx1lFNHqdKiqim53FWstS0vLotXKyNptRNE/33PePXN4nvlzS0ghEGlMfeMulPC41952UKx0l/j9TzzEB3/kAP28HjTyA5IRNm7YTggOr/x6Z/RYCBaBpK4ryqqiNoZ+v48PgXanTQieqrLkeUlVGoz15HnOSq/LxaUFzs+e59ix4xw9doy8rjh+8hgm77Nh3TqGh4cJrYxICwKNRqYoC5a7q0xOTtJqt6nKklYrE0VRMmRKolan/fT8Cqeev8DJp8+gpCAebbPnhh28rLZ8rf0YzVOHn+bE0RWKgSLCWrDVFOPjLaTPWDcz+RNJJ01mz55HCMGlqtY7R6fTQUcR3geKoqQoCryHurYURUGv32NpaYnZ2TnOnDmLszU7tkwjtKKVtoiQeFPRW12irnqkaUzbt9E6Io5jiqpkeWWVkaFheqZHv9+n02nLNFXhxv033n/0+eRvd7fN/ZdsZgQRg4gipBSNIuP1NqriKELpBGVfcsCmDPR9l6mN0z+0Yc/Ov1uXPeSZ85S1xflmNlJJTaw1/bIYAOIHejpLP8/p93r0ipzF5XkWFy7SziImxqdfYgYGLU0hJATwwbDaK6mtRemUjtQ451lYWKS/usrY2FhTtUvk+Oh40CIktx48+J+CC+7kySN/ILQjSEUVBC9n4l5zM1xIgdCDOfzgcLZGKsnM9K6/t+O6a38vxDLVrZT2yBDee6q6GnR0BSsrK/R6Peq6HoRwc3kwNQB53mOlu0SSKCYmRom1JjiPKSvqumkRKC3QsSJJU6JIU1UVCwsLGFPT73fRkaCqc6oqZ2h4mE6nQ5pmoigKnK2T2++447dmNu28qXteIObHSH2G0vI7tJhmbPUlmQaO5YWc8qTBjY8ilGJyZoS9B+77yLYbrv8Vz4AnUpLhdWMszi0OFACCfpHTLwpc8OAF1lqSNGluNooRdcVydxUbAp3hIZSQ2LoGV2PrsukBSwE6RsqGVfDGooTC2xJn+qSxJLia9kibgENpSZxE5FVFWhm6/ZyhYT20f//+/3P+Qu/+r/yPZ+rFi8tsv20D09tbOOuubDFBCGTlpZw/JuAkcIyxoR4/cucbWPhKTuU3UKvN3P7Au35i14H9v2xDjahqpGl+8NBQm/HxEZyzjby9LHHOUVU1q6urXJy7yNzFeeYXFujnObMX5yjyVbIoRotBVmyb7t6l0R3vPXVVURQF1lmk0uhIo5Wirms6rRYCaKcZw+0hBM18Uz/PMaZRVNV1zfBw6437brv2HxT5cRaOfJlzj38NgUJKfXUWI3If5NLZAI5OFvPQL/4CE1HMn37ij2lL2Hfzvh9at2nq34XaKGwYiBQs0jfrtj3SIbmoWF4yjRjaVnhv6faXm8GJvKauaipT0ev3UFrjrKEoavyAWFNRTBY1wkal1GDuQBLFEQKIIo0YSFq1TmmpmCSKSdMUQcBbf3kDDucafsrVNVtnNvzcD/70jz127vSFL0mpUGn6HS2lUDlPO0351M//C+654x6+8Lk/Jy8K9u/f99033X7wPwRnE2qHumyEAeE8pqpRWjE6OkK/16OqKqyNqbsVOlKoSOKMRWtwXtBqJehE4EzdLEc0VWxxzS3hfdMwvyR8llqhpURKUDIi0SlRlKCUIIpi4iQhSRKUUhAGltPvN5MpArJWe/imffv+sJ+Lg72iPhe+Ex9jvaPTzvjkz/1zvuue+6DqEacx17/zgTffeNdt/zV4OxLKRpYhBATfyDe8MTjjsRaSJGN0bBQ/IONDCERRRFVVlLJoJlhaCXXdzA045/DGETzUqWmyVjzOG6w16IEsViqNEvLyXECapmStFCUFSZqQJglpmqKURAqBN45alkRaYXyMMjWximc2rp/4h08ePvUzQ0PDQFgbGOMbxVNeFLznph9hZ/omnn1klXHXZveuN2w98LYdvxNFatwVFcLaRnwYBlIO47HGNv0X2/Rf4iSj07aD4SooypIkjolNhPM1eHG5Z2MG0coZi9IK7ZqmufPNHg6KpoiUSqOFQkqJUI2mV0eq0eRECVJFKB2howSQTX0nDDqx6KpGIDDKsXHTuo+srna/3l3N/1BKsTYwm2e3NsGklMQLMf/uV36Tvs25/9pboh/4nrd/VKXJjC9qpAvgHM5ZQhBorbDOU5UVxlmcb6RkkVbEcUKaNXQJohFUaxdhTNWse+eR0iKERAqJUxrtFMrURFqDgKIo8d7RzjIayCVaa1Qk0VqSREnDhbtmxl8KjVIxQShsaJQTeVnTbJQhiGJAarZsnfrfjx85/RfBh8U1gfmFj77ncrgOKiCFYGVpmWhiyz9VN4x/vyzrhjl0geB8UylLRfAB73wzHRJCwxnRXC+EREeaKJZYFyHE4MaFoqZGyYAUFonEao3zHmubdoJ3zeY5kQ+srCzRabeJpEbrCCEkcaKQQiDlgKgbtEwZNOatMXjnkCLBKUtdCwql8UgQjrqqtqKiu13wf7QmMH/2Z99KmZjaceCubbdet3Pzh0NVE6whWI8zDrxrKGsl8aLpyVzilZyzBO8v+xcpJJGOCKmkFpa69mitCaFRfUg5WBqmRgwa5ZGUeAnOmWbaxQfquqY10iKOEtwlBnMgh29+SjP+Z62lruvLyaGzBimHEEJifUFcGzqdDB0pIi03BGfXXkqzS2de1q6EOCEZ37blV6TS7VCZRshjmvbkpUghpWqkGr7R53oczhmctZen7UGgdUptSoRwRFEESKTUWGsINK0KzWBfJNHMZ1s8sY6JhyOUoLlRKRrxomp2ngm+CccW35DmodEKe3+JVgEVBK7lMdIhfaPaUoVGa02s9V11r/6ttQe5Jl9qEtfGcd+tO981s23kPl8UhOAGerhBPA9hQLQ3+yYEHFI1YiLvm1JAKQXUSCkxl8xaCrwfRCofml2KBp/V/J8HGeGtQCmPzlSzG0msWV5extpmSD6EZvkGwIVArBMIEud9Y72hGSFqFBKesixpDayrriq8dSRZSjwUH6Qu155mGmmJl8gzR2fbpsl/hBFgy0YO5j0hCIKXeCfxoqmejbEDtbdEoNEqwoaGgxahGdAM2GZW2gWCEA1/7XzjR4yntvVl0JrvuDS90uj0Ip0wMtxMqQkhiKQkCNm8rlTTBZQaKTWEBhBEk9sEIalri44NyjUyEu8cQQSU0KO+MsNrAjOVXOKfHTM7Nvzopq3r9mEseIEYOFbvBd6LASXrB1IOf5kt8INNtYBm4sTYxrpRRFGCwaKCHaitPN65y2JoZz0ChakNLjhC8E1vx1qkikFGxFoiBCipkUI3lhOaZR1pNSDwRVOKhEYqEkdN4ekH9xAnCWrQEomkmnKVvXtNYJYWGs5Ha/Q1u7e9VUoWG2uVIALBWWxtQajBcvI4515iFy/JTgdtBWubva6csYjQWMMlDa9W0eWwnqQRSgasayzSi4AKTVLIQBNT1zUei5YxSumGfTAlxlq01iRJgvUBV9cE7xruSAqEEBgqklhjjUPJgMMQdCNOKrGicu7A/zcAw69nEgvV9NgAAAAASUVORK5CYII='
	},
	
	lang:
	{
		settings: {
			bool: ['Булев параметр','Подсказка булева параметра'],
			num: ['Целый параметр','Интервал от 1 до 500, целое число'],
			floatNum: ['Числовой параметр','Интервал от 1 до 500'],
			str:  ['Строковой параметр','Подсказка строкового параметра'],
			list: ['Список',{one: 'Один', two:'Два', three:'Три'}],
			buttonPluginMethod: 'Метод плагина',
			buttonInlineMethod: 'Собственный метод'
		},
		
		categories: 
		{
			settings_test: 'Секция тестовых настроек'
		},
		
		tabTitle: 			'В +'  /* сумма (&#8512;), звёздочка (&#9733;), молоточки (&#9874;) */,
		saved: 				'Настройки сохранены',
		nothingShow: 		'Нет параметров для отображения',
		version:				'Версия',
		homePage:			'Домашняя страница',
		author:				'Автор',
		debugMode:			'режим отладки',
		donate:				'Яндекс.Деньги'
	},
	
	events: 
	{
		tabActivated: null
	},
	
	pages: 
	{
		'settings': function()
		{
			var tabImg = $('<img>').attr('src',this.resources.tabIcon).css('margin','-2px 0px -4px 0px').css('height','16px');
			this.tab = vkPatch.iface.addTab(tabImg, $('#content > div.tBar:first > ul,#content > div.tabs:first > ul'),this.settingsHash).click(jQuery.proxy(this.tabClickHandler,this));

			// если в адрее указан ?show=vkpatch
			if (vkPatch.page.params.show == 'vkpatch') 
			{
				this.activateTab();
			}
			else
			{
				// Если в адресе есть #vkpath, то активируем вкладку
				this.checkHash();
			};
			
		}
	},
	
	init: function()
	{
		vkPatch.events.pluginInitialized.bind(function(pluginName, plugin)
		{
			if (plugin.settings && $('#vkPatchSettings').length)
			{
				this.showTabContent();
			}
		}, this);
	},
	
	// тег страницы настроек
	settingsHash: '#vkpatch',
	
	/**
	 * Содержание
	 */
	
	// ссылка на вкладку
	tab: null,
	
	// содержание вкладки
	tabContainer: null,
	
	// элемент, в который добавляется содержимое категории
	categoryContainer: null,
	
	/*
	 * Активация вкладки по хешу
	 */
	checkHash: function()
	{
		if (location.hash == this.settingsHash)
		{
			this.activateTab();
		};
	},
	
	buttonPluginMethodTest: function()
	{
		alert('buttonPluginMethod ok');
	},
	
	tabClickHandler: function(e,data)
	{
		// временный фикс для вкладки
		// если находимся на новой вкладке, то перезагружаемся в старую
		// в старых вкладках есть .php в конце, в новых - нет
		/*if (! /\.php$/.test(location.pathname) )
		{
			location.href = 'http://'+location.host+'/settings.php'+this.settingsHash;
			e.preventDefault();
			return false;
		};*/

		// отменяем обработчик события поумолчанию
		// чтобы IE не брал страницу из кеша
		e.preventDefault();
		vkPatch.page.hash(this.settingsHash);
		this.activateTab();
	},
	
	/*
	 * Активируем вкладку
	 */
	activateTab: function()
	{
		// активируем вкладку
		vkPatch.iface.activateTab(this.tab);
				
		vkPatch.page.add(['ui_controls.css','privacy.css', 'ui_controls.js','privacy.js'],jQuery.proxy(this.showTabContent,this));
	},
	
	/*
	 * Содержимое вкладки
	 */
	showTabContent: function()
	{
		/*
		 *  Колбек, который вызывается при выборе элемента списка
		 */
		cur.onPrivacyChanged = function(key)
		{
			var value = _window.Privacy.getValue(key);
			// значение выпадающего списка представляет собой величину вида: -1_1_[значение выбранного элемента]_
			// извлечём
			value = value.substring(5, value.length-1)
			$('#'+key).val(value);
		};

		// Удаляем сообщения
		$('#content > div > div.msg').parent().remove();
		
		// очищаем страницу и подготавливаем форму
		this.tabContainer = $('#content').children('div.tabs').nextAll().remove().end().end().append('<div id="settings_result" style="display: block; "></div><div id="settings_panel" class="clear_fix"><form mathod="get" action="#" name="vkPatchSettings" id="vkPatchSettings"></form></div>').find('form');
		// Нечего отображать
		var nothingShow = true;
		this.tabContainer.append(this.aboutPanel());
		nothingShow = false;
		
		for (var categoryName in vkPatch.settings.categories)
		{
			if (!vkPatch.settings.categories.hasOwnProperty(categoryName)) continue;
			
			// пропускаем скрытые настройки
			if (categoryName == 'hidden') continue;
			// отключаем тестовую секцию, если не в режиме отладки
			if (categoryName == 'settings_test' && !vkPatch.debug) continue;
			
			nothingShow = false;
			
			var category = vkPatch.settings.categories[categoryName];

			if (category.length > 0)
			{
				this.categoryContainer = $('<div class="settings_section"></div>');
				this.categoryContainer.append('<h2>'+(vkPatch.lang.categories[categoryName]||categoryName)+'</h2>');
				this.tabContainer.append(this.categoryContainer);
			}
			
			for (var i=0; i < category.length; i++)
			{
				var option = category[i];
				var type = option.getType();

				switch (type)
				{
					case vkPatch.settings.TYPE_STRING:
						
						this.stringParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_BOOL:
						
						this.booleanParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_INT:
					case vkPatch.settings.TYPE_FLOAT:
						
						this.numberParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_LIST:
							
						this.listParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_BUTTON:
					
						this.buttonParam(option);
						
						break;
						
					case vkPatch.settings.TYPE_PANEL:
						
						this.panelParam(option);
						
						break;
				};
				
			};
			
		};
		
		if (nothingShow) 	/* нет параметров для отображения */
		{
			vkPatch.iface.inlineMessage(this.lang.nothingShow).insertBefore('#content > div.editorPanel');
		}
		else
		{
			// Кнопка "сохранить"
			this.button('Сохранить', jQuery.proxy(this.save,this));	
		};
		
		this.events.tabActivated.raise();
	},
	
	/*
	 * Сохранение параметров
	 */
	save: function()
	{
		var serializedForm = $('#vkPatchSettings').serializeArray();

		for (var i=0; i<serializedForm.length; i++)
		{
			vkPatch.settings.container[serializedForm[i].name].set(serializedForm[i].value);
			$('#'+serializedForm[i].name).val(vkPatch.settings.container[serializedForm[i].name].get());
		}

		
		// Выводим сообщение
		this.showMessage(this.lang.saved, 'normal');

		// Прокручиваем страницу наверх
		$(_window).scrollTop(0);
	},
	
	/**
	 * Вывести сообщение вверху панели
	 * @param {string} message
	 * @param {string} [type=normal] - error или normal
	 * @param {integer} [delay=4000] - время показа сообщения в мс, -1 - не скрывать
	 */
	showMessage: function(message, type, delay) 
	{
		delay = delay || 4000;

		$('#settings_result').empty();	// удаляем старое
		switch (type)
		{
			case 'error':
				var messageElement = vkPatch.iface.inlineError(message);
			break;
			
			case 'normal':
			default:
				var messageElement = vkPatch.iface.inlineMessage(message);
		}
		
		messageElement.appendTo('#settings_result');
		
		/* скрываем через заданный интервал */
		if (delay > 0) 
		{
			messageElement.delay(delay).slideUp('slow');
		};
	},
	
	/*
	 * Строковой параметр
	 */
	stringParam: function(option)
	{
		var title = option.title;
		var desc = option.desc || '';
		
		var label = $('<div style="display: inline-block; width: 200px;">'+title+':</div>');
		var input = $('<div style="display: inline-block;"><input type="text" class="text" id="'+option.name+'" name="'+option.name+'" value="'+option.get()+'" /></div>');
		
		var container = $('<div style="margin: 4px 0px"></div>').append(label).append(input);
		this.categoryContainer.append(container);
		
		// вешаем подсказку
		if (option.desc) 
		{
			vkPatch.iface.tooltip('balloon', label, option.desc);
		};
		
	},
	
	/*
	 * Булевский параметр
	 */
	booleanParam: function(option)
	{
		
		// Добавляем строку параметра
		var checked = option.get() ? 1 : 0;
		var wrapper = $('<div id="'+option.name+'_wrapper" class="settings_service_row clear_fix">');
		var hidden = $('<input type="hidden" id="'+option.name+'" name="'+option.name+'" />').val( checked );
		wrapper.append(hidden);
		
		var checkbox = $('<div class="checkbox fl_l" onclick="checkbox(this);" name="checkbox_'+option.name+'"><div></div>'+option.title+'</div>');
		if (checked)
		{
			checkbox.addClass('on');
		};
		
		var optionName = option.name;
		wrapper.append(checkbox);
		
		this.categoryContainer.append(wrapper);
		checkbox.click(function()
		{
			$('#'+optionName).val(_window.isChecked(this));
		});
		
		var input = _window.ge(option.name);
		
		// Функцией ВКонтакте, преобразуем флажок
		//new _window.Checkbox(input, {checked: option.get(), label: option.title,  onChange: function() { }});
		
		if (option.desc)
		{
			vkPatch.iface.tooltip('balloon', checkbox, option.desc, -25);
		}
	},
	
	/*
	 * Число
	 */
	numberParam: function(option)
	{
		// Поле выглядит так-же, как и строковой параметр
		this.stringParam(option);
	},
	
	
	/*
	 * Список
	 */
	listParam: function(option)
	{

		// Выбранный вариант
		var selected = option.get();

		// Название выбранного варианта
		var selected_title = selected;
		var selected_index = 0;
		
		
		var desc = {};
		// Если не определены описания
		if (option.desc === null)
		{
			option.desc = {};
		};

		// получаем названия вариантов
		for (var i=0; i<option.list.length; i++)
		{
			// Из описания или если нет, то берём просто имя
			var title = option.desc[option.list[i]] || option.list[i];
			
			
			desc[option.list[i]] = title;
			
			// Нашли выбранный
			if (option.list[i] == selected)
			{
				selected_index = i;
				selected_title = title;
			}
		}
	

		this.categoryContainer.append('<div style="margin: 4px 0px"><div style="display: inline-block; width: 200px">'+option.title+':</div><div class="settings_privacy_control" style="display: inline-block;padding: 4px;"><a id="privacy_edit_'+option.name+'" style="cursor: pointer;" onclick="return Privacy.show(this, event, \''+option.name+'\');">'+selected_title+'</a><span></span></div><input type="hidden" id="'+option.name+'" name="'+option.name+'" value="'+selected+'"/></div>');
		if (!_window.cur.privacy)
		{
			_window.cur.privacy = {};
		};
				
		_window.cur.privacy[option.name + '_types'] = desc;
		_window.cur.privacy[option.name] = [selected];
	},
	
	/**
	 * Вывести параметр-кнопку
	 * @param {object} option - описание параметра из vkPatch.settings.
	 */
	buttonParam: function(option) 
	{
		this.button(option.title, option.buttonHandler, option.name, option.desc, 'gray');		
	},
	
	/**
	 * Вывести кнопку на панель настроек
	 * @param {string} label - текст кнопки
	 * @param {function} handler - обработчик нажатия
	 * @param {string} [id] - id кнопки
	 * @param {string} desc - описание
	 */
	button: function(label, handler, id, desc, color) 
	{
		var button = vkPatch.iface.button(label, handler, id, color);
		// посказка
		if (desc) 
		{
			vkPatch.iface.tooltip('balloon', button, desc);
		};
		
		this.categoryContainer.append( 
			$('<div>').css(
				{
					'text-align': 'center',
					'margin': '5px 0px',
					'clear': 'both'
				})
			.append( button )
		);
	},
	
	/**
	 * Вывести панель
	 * @param {object} option - описание параметра
	 */
	panelParam: function(option) 
	{
		if (_.isFunction(option.panel))
		{
			var panel = option.panel();
		}
		else
		{
			panel = option.panel;
		};
		
		this.categoryContainer.append(panel);
	},
	
	aboutPanel: function() 
	{
		var debug = vkPatch.debug ? ' <small>[' + this.lang.debugMode + ']</small>' : '';
		return $.nano('<div class="settings_section" style="color: #555"><img src="'+this.resources.rabbit+'" style="float: left; margin-bottom: 10px; margin-right: 30px;"><h4 style="color: #555; margin-bottom: 8px; padding-top: 6px;">vkPatch'+debug+'</h4>{version}: '+vkPatch.version+'<br>{homePage}: <a href="http://klinifini.livejournal.com/">http://klinifini.livejournal.com/</a><br>{author}: <a href="http://vkontakte.ru/pochemuto">Сергей Третьяк</a><br>{donate}: <b>41001936638703</b></div>', this.lang);
	}
		
});