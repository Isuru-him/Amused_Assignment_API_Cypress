/// <reference types="Cypress" />

describe("My API Test Suite", ()=>{

    it("FirstTest Get Single Object_Status verification", ()=>{

        //verify the status code of the get single object endpoint 
        cy.request("GET", "https://api.restful-api.dev/objects/7")
        .its('status')
        .should('equal',200);
    })

    it("SecondTest Get Single Object Year verification", ()=>{

        //verify the response body parameters of the get single object endpoint
        cy.request("GET", "https://api.restful-api.dev/objects/7")
        .then((response)=>{
            
            expect(response.body.data.year).to.eq(2019)
            expect(response.body.data.price).to.eq(1849.99)
            expect(response.body.data['CPU model']).to.eq("Intel Core i9")
            expect(response.body.data['Hard disk size']).to.eq("1 TB")
            expect(response.body.id).to.eq("7")
            expect(response.body.name).to.eq("Apple MacBook Pro 16")
        })
    })



    it("ThirdTest Add object status verification", ()=> {

        //verify the status code of the add object object endpoint 
        cy.request({
            method: 'POST',
            url : 'https://api.restful-api.dev/objects',
            body:{
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }
        }).its('status').should('equal',200);
    })



    it("ForthTest Add object response data verification", ()=>{

        //verify the response body parameters of the add object endpoint
        cy.request({

            method:"POST",
            url:"https://api.restful-api.dev/objects",
            body:{
                "name": "Isuru",
                "data": {
                   "year": 2023,
                   "price": 2023.23,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "2 TB"
                }
            }
        }).then((response) =>{

                expect(response.body.name).to.eq("Isuru");
                expect(response.body.data.year).to.eq(2023);
                expect(response.body.data.price).to.eq(2023.23);
                expect(response.body.data['CPU model']).to.eq("Intel Core i9");
                expect(response.body.data['Hard disk size']).to.eq("2 TB");
                expect(response.body.createdAt).to.be.exist;
        })
    })


    it("FifthTest Update object response data verification", ()=>{

        //verify the status code of the update object endpoint

        cy.request({

            method:"POST",
            url:"https://api.restful-api.dev/objects",
            body:{
                "name": "Isuru",
                "data": {
                   "year": 2023,
                   "price": 2023.23,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "2 TB"
                }
            }
        }).then((response) =>{

            const id =response.body.id            
            cy.request({

                method:"PUT",
                url:`https://api.restful-api.dev/objects/${id}`,
                body:{

                    "name": "updated_Name",
                    "data": {
                       "year": 2024,
                       "price": 2024.24,
                       "CPU model": "Intel Core i10",
                       "Hard disk size": "3 TB",
                       "color": "red"
                    }
                }
            }).its('status').should('equal',200)
        })
    })


    it("SixthTest Update object response data verification", ()=>{

        //verify the response body parameters of the update object endpoint
        cy.request({

            method:"POST",
            url:"https://api.restful-api.dev/objects",
            body:{
                "name": "Isuru",
                "data": {
                   "year": 2023,
                   "price": 2023.23,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "2 TB"
                }
            }
        }).then((response) =>{

            const id =response.body.id            
            cy.request({

                method:"PUT",
                url:`https://api.restful-api.dev/objects/${id}`,
                body:{

                    "name": "updated_Name",
                    "data": {
                       "year": 2024,
                       "price": 2024.24,
                       "CPU model": "Intel Core i10",
                       "Hard disk size": "3 TB",
                       "color": "red"
                    }
                }
            }).then((response)=>{

                expect(response.body.name).to.eq("updated_Name");
                expect(response.body.data.year).to.eq(2024);
                expect(response.body.data.price).to.eq(2024.24);
                expect(response.body.data['CPU model']).to.eq("Intel Core i10");
                expect(response.body.data['Hard disk size']).to.eq("3 TB");
                expect(response.body.data.color).to.eq("red");
                expect(response.body.updatedAt).to.be.exist;
            })
        })
    })


    it('SeventhTest - delete object response status verification', ()=>{

        cy.request({

            method:"POST",
            url:"https://api.restful-api.dev/objects",
            body:
            {
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }

        }).then((response)=>{

            const id = response.body.id
            cy.request("DELETE",`https://api.restful-api.dev/objects/${id}`)
            .its('status').should('equal',200)

        })
    })


    it('EighthTest - delete object response data verification', ()=>{

        cy.request({

            method:"POST",
            url:"https://api.restful-api.dev/objects",
            body:
            {
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }

        }).then((response)=>{
            
            const id = response.body.id
            cy.request("DELETE",`https://api.restful-api.dev/objects/${id}`)
            .then((res)=>{

                expect(res.body.message).to.be.exist
                expect(res.body.message).to.eq(`Object with id = ${id} has been deleted.`)
            })

        })
    })


})