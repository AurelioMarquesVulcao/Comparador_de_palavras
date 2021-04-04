/**
 * Em teoria da informação, a distância Levenshtein ou distância de edição entre dois "strings"
 *  (duas sequências de caracteres) é dada pelo número mínimo de operações necessárias
 * para transformar um string no outro. Entendemos por "operações" a inserção,
 * deleção ou substituição de um carácter. O nome advém do cientista russo Vladimir Levenshtein,
 * que considerou esta distância já em 1965. É muito útil para aplicações que
 * precisam determinar quão semelhantes dois strings são, como é por exemplo o
 * caso com os verificadores ortográficos
 */

const { timesSeries } = require('async');

class AlgoritmoString {
  constructor() {
    this.result = 0;
    this.pontos = [];
    this.test1;
    this.test2;
    this.valorUnitario = 0;
  }


  similaridade(test1, test2) {
    this.test1 = test1.toLowerCase().split('');
    this.test2 = test2.toLowerCase().split('');
    this.testes();
    this.result = this.round(Math.max.apply(null, this.pontos) * 100, 2);
    this.respota = {
      string1: test1,
      string2: test2,
      similaridade: `${this.result} %`,
    };
    console.table(this.respota);
    // zerando os resultados
    let retorno = this.result
    this.result = 0;
    this.pontos = [];
    this.valorUnitario = 0;
    return retorno
  }

  /**
   * Testes a serem realizados
   */
  testes() {
    if (this.match1() === true) {
      this.pontos.push(1);
      return true;
    } else {
      this.pontos.push(0);
    }
    this.valorCaractere();
    this.Levenshtein();
    // this Soundex()
  }

  /**
   * verificar se existe match perfeito
   * @param {Array} test1 String de analise ja convertida em array
   * @param {Array} test2 String de analise ja convertida em array
   * @param {Number} pontos Total percentual atual da string
   * @returns
   */
  match1() {
    let resultado = true;
    for (let i = 0; i < this.test1.length; i++) {
      // this.valores.test1[i] = { [this.test1[i]]: 0 };
      if (this.test1[i] != this.test2[i]) {
        resultado = false;
      }
    }
    for (let i = 0; i < this.test2.length; i++) {
      // this.valores.test2[i] = { [this.test2[i]]: 0 };
      if (this.test1[i] != this.test2[i]) {
        resultado = false;
      }
    }
    return resultado;
  }

  /**
   * Atribui um valor para cada caracere para ser usado no algoritmo de Levenshtein
   */
  valorCaractere() {
    let valor = 0;
    if (this.test1.length != this.test2.length) {
      valor = 1 / (this.test1.length + this.test2.length);
    } else {
      valor = 1 / this.test1.length;
    }
    this.valorUnitario = valor;
    return valor;
  }

  /**
   * Avaliara o quanto preciso mexer numa string para igualar a outra
   * testando 1 caractere
   */
  Levenshtein() {
    if (this.test1.length > this.test2.length) {
      this.maiorString = this.test1;
      this.menorString = this.test2;
    } else {
      this.maiorString = this.test2;
      this.menorString = this.test1;
    }

    // Removendo carateres para igualar as strings
    let maior = this.maiorString;
    let menor = this.menorString;
    let contador = 0;
    for (let i = 0; i < this.maiorString.length; i++) {
      if (menor[i] != maior[i]) {
        contador++;
        maior.splice(i, 1);
        i--;
      }
      if (maior.join('') === menor.join('')) {
        this.pontos.push(1 - this.valorUnitario * contador);
      }
    }

    // Adicionando carateres para igualar as strings
    let contador2 = 0;
    for (let i = 0; i < menor.length; i++) {
      if (menor[i] != maior[i]) {
        maior.push(menor[i]);
        contador2++;
      }
      if (maior.join('') === menor.join('')) {
        this.pontos.push(this.valorUnitario * (menor.length - contador2));

      }
    }
  }


  /**
   * Rounds the desired number one x decimal places
   * @param {Number} num Number.
   * @param {Number} places Decimal places.
   * @returns Expected return 1.01 to 2 decimal places
   */
  round(num, places) {
    if (!('' + num).includes('e')) {
      return +(Math.round(num + 'e+' + places) + 'e-' + places);
    } else {
      let arr = ('' + num).split('e');
      let sig = '';
      if (+arr[1] + places > 0) {
        sig = '+';
      }

      return +(
        Math.round(+arr[0] + 'e' + sig + (+arr[1] + places)) +
        'e-' +
        places
      );
    }
  }
  // // algoritmo Soundex
}


module.exports.AlgoritmoString = AlgoritmoString;
