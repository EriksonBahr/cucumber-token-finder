import * as Gherkin from "@cucumber/gherkin"
import * as Messages from "@cucumber/messages"
import { readFileSync } from "fs"
import { findTokenIndexesOnColumns } from "./table"
import { findToken } from "./token"

let file = readFileSync("test.feature", "utf-8")

var uuidFn = Messages.IdGenerator.uuid()
var builder = new Gherkin.AstBuilder(uuidFn)
var matcher = new Gherkin.GherkinClassicTokenMatcher()

var parser = new Gherkin.Parser(builder, matcher)
var gherkinDocument = parser.parse(file)
var pickles = Gherkin.compile(gherkinDocument, 'test.feature', uuidFn)

pickles.forEach(p => {
    p.steps.forEach(s => {
        let PIIData = findToken(s.text, 'PII')
        if (PIIData) {
            console.log(PIIData) 
        }     

        let PHIData = findToken(s.text, 'PHI')
        if (PHIData) {
            console.log(PHIData)
        }

        let dt = s.argument?.dataTable
        if (dt && dt.rows.length > 1) {
            let tableHeaders = dt.rows[0].cells.map(c => c.value)
            let piiColumnIndexes = findTokenIndexesOnColumns(tableHeaders, 'PII')
            let phiColumnIndexes = findTokenIndexesOnColumns(tableHeaders, 'PHI')
            let allIndexes = piiColumnIndexes.concat(...phiColumnIndexes)
            
            let piiPhiValuesTable: string[] = []
            for (let i = 1; i < dt.rows.length; i++) {
                dt.rows[i].cells.forEach((cell, i) => {
                    if (allIndexes.includes(i)) {
                        piiPhiValuesTable.push(cell.value)     
                    }
                });
            }

            console.log(piiPhiValuesTable)
        }
    })
})
