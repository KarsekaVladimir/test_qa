/// <reference types="Cypress" />

describe('test api /courses', () => {
    it('check api status', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
        }).then(res => {expect(res.status).to.equal(200)})
    })

    it('check api structure', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'limit': [1],
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf.above(0);
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('name');
            expect(res.body[0]).to.have.property('url');
        })
    })

    it('check default "limit" value', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(2);
        })
    })

    it('check "limit" range value', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'limit': [7],
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf.above(0);
            expect(res.body).to.have.lengthOf.lessThan(11);
        })
    })

    it('check responce JSON asc', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'sort':['asc'],
                'limit': [5],
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/)
            expect(res.status).to.equal(200)
            expect(res.body).to.have.lengthOf.above(0);
            expect(res.body[0]).to.have.property("id", 12);
            expect(res.body[1]).to.have.property("id", 14);
            expect(res.body[2]).to.have.property("id", 57);
            expect(res.body[3]).to.have.property("id", 312);
            expect(res.body[4]).to.have.property("id", 356);
        })
    })

    it('check responce JSON desc', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'sort':['desc'],
                'limit': [5],
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/)
            expect(res.status).to.equal(200)
            expect(res.body).to.have.lengthOf.above(0);
            expect(res.body[4]).to.have.property("id", 12);
            expect(res.body[3]).to.have.property("id", 14);
            expect(res.body[2]).to.have.property("id", 57);
            expect(res.body[1]).to.have.property("id", 312);
            expect(res.body[0]).to.have.property("id", 356);
        })
    })

    it('check responce JSON data ', () => {
        cy.request({
            method: 'GET',
            url: '/courses',
            qs: {
                'sort':['asc'],
                'limit': [5],
                'page': [1]
            }
        }).then(res => {
            expect('Content-Type', /json/);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf.above(0);
            expect(res.body[0]).to.have.property("id", 12, "name", "Assessing Drivers of Business Growth", "url", "of-business-growth");
            expect(res.body[1]).to.have.property("id", 14, "name", "Budgeting and Forecasting", "url", "budgeting-and-forecasting");
            expect(res.body[2]).to.have.property("id", 57, "name", "Building a 3 Statement Financial Model", "url", "statement-financial-model");
            expect(res.body[3]).to.have.property("id", 312,"5 Cs of Credit","url","5-cs-of-credit");
            expect(res.body[4]).to.have.property("id", 356, "name", "Assessing Management", "url", "assessing-management");
        })
    })
})