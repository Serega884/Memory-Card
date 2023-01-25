/* eslint-disable no-undef */
/// <reference types="cypress" />
describe('Приложение карточки', () => {
    beforeEach(() => {

        cy.visit('http://127.0.0.1:5500/');

    });
    it('Проверка количества карточек по умолчанию', () => {
        cy.get('input').should('contain.value', 4);
    });

    it('При нажатии кнопки Start, появляется поле 4Х4', () => {
        cy.contains('Start').click();
        cy.get('.memory-card').should('have.length', 16);
    });

    it('Проверка что все карточки закрыты', () => {
        cy.contains('Start').click();
        cy.get('.memory-card').should('not.have.class', 'flip');
    });

    it('Нажатие на одну произвольную карточку.', () => {
        cy.contains('Start').click();
        cy.get('.memory-card').eq(4).click();
    });

    it('Поиск одинаковой пары, сделать так чтоб она осталась видимая', () => {
        cy.contains('Start').click();
        let mem;
        let mem2;
        cy.get('.memory-card').then((car) => {
            mem = car[0].textContent;
            cy.get('.memory-card').first().click();
            for (let i = 1; i < 16; i++) {
                if (i % 2 == 0) {
                    cy.get('.memory-card').first().click();
                }
                cy.get('.memory-card').eq(i).click();
                mem2 = car[i].textContent;
                if (mem == mem2) {
                    break;
                }
            }

        });

    });
    
    it('Открытие всех пар', () => {
        cy.contains('Start').click();
        let i = 0;
        let g = 8;
        while (g < 16) {
            cy.get('.memory-card').eq(g).click();
            cy.get('.memory-card').eq(i).click();
            i++;
            g++;
        }
        cy.get('.memory-card').should('have.class', 'flip')
    })
});