
Feature: Feature
    Scenario: Scenario
        Given a patient with the social security number "123123123" (PII) exists in the system
        When the pshysican searches by the patient "Disney, Orlando" (PHI) that resides on "Foo bar street, 123" (PHI)
        And I imported the study context information to Reporting application
            | file                  | name (PHI)      | mrn (PHI)   | birthDate  | gender | email (PII)
            | PreProcedureData.json | Disney, Orlando | PID75416969 | 1984-09-05 | male   | orl.dis@email.com
        Then asd