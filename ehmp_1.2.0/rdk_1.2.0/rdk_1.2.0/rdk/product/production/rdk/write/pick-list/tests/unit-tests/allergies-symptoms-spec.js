/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach, spyOn, expect, runs, waitsFor */
'use strict';

var log = require('bunyan').createLogger({
    name: 'allergies-symptoms-fetch-list',
    level: 'warn'
});

var parseRpc = require('../../parsers/allergies-symptoms-parser').parseSymptoms;

var message2parse = "476^A FIB-FLUTTER\t<ATRIAL FIBRILLATION-FLUTTER>^ATRIAL FIBRILLATION-FLUTTER\r\n237^ABDOMINAL BLOATING\r\n236^ABDOMINAL CRAMPS\r\n429^ABDOMINAL DISCOMFORT\r\n235^ABDOMINAL PAIN\r\n430^ABNORMAL ECG\r\n477^ABNORMAL ECG\t<ECG ABNORMALITY>^ECG ABNORMALITY\r\n477^ABNORMAL EKG\t<ECG ABNORMALITY>^ECG ABNORMALITY\r\n316^ABNORMAL SEXUAL FUNCTION\r\n526^ABNORMAL VISION\r\n309^ABSCESS\r\n308^ACIDOSIS\r\n307^ACNE\r\n306^ACUTE INTERSTITIAL NEPHRITIS\r\n305^ACUTE RENAL FAILURE SYNDROME\r\n304^ACUTE RENAL IMPAIRMENT\r\n304^ACUTE RENAL INSUFFICIENCY\t<ACUTE RENAL IMPAIRMENT>^ACUTE RENAL IMPAIRMENT\r\n234^ACUTE RESPIRATORY DISTRESS\r\n303^ACUTE TUBULAR NECROSIS\r\n314^ACUTE UPPER AIRWAY OBSTRUCTION\t<UPPER AIRWAY OBSTRUCTION>^UPPER AIRWAY OBSTRUCTION\r\n476^AFIB-FLUTTER\t<ATRIAL FIBRILLATION-FLUTTER>^ATRIAL FIBRILLATION-FLUTTER\r\n233^AGGRESSION\t<AGGRESSIVE BEHAVIOR>^AGGRESSIVE BEHAVIOR\r\n233^AGGRESSIVE BEHAVIOR\r\n36^AGITATION\r\n423^AGITATION\t<FEELING AGITATED>^FEELING AGITATED\r\n37^AGRANULOCYTOSIS\r\n306^AIN\t<ACUTE INTERSTITIAL NEPHRITIS>^ACUTE INTERSTITIAL NEPHRITIS\r\n498^AION\t<ISCHEMIC OPTIC NEUROPATHY>^ISCHEMIC OPTIC NEUROPATHY\r\n527^AIRWAY CONSTRICTION\r\n314^AIRWAY OBSTRUCTION\t<UPPER AIRWAY OBSTRUCTION>^UPPER AIRWAY OBSTRUCTION\r\n232^AKATHISIA\r\n302^AKINESIA\r\n479^ALK PHOS ELEVATED\t<INCREASED ALKALINE PHOSPHATASE>^INCREASED ALKALINE PHOSPHATASE\r\n479^ALK PHOS INCREASED\t<INCREASED ALKALINE PHOSPHATASE>^INCREASED ALKALINE PHOSPHATASE\r\n479^ALK, ELEVATED\t<INCREASED ALKALINE PHOSPHATASE>^INCREASED ALKALINE PHOSPHATASE\r\n231^ALKALINE PHOSPHATASE RAISED\r\n479^ALKALINE PHOSPHATASE RAISED\t<INCREASED ALKALINE PHOSPHATASE>^INCREASED ALKALINE PHOSPHATASE\r\n545^ALLERGIC PNEUMONITIS\r\n465^ALLERGIC RHINITIS\r\n7^ALOPECIA\r\n480^ALT (SGPT) ELEVATED\t<INCREASED SERUM ALT (SGPT)>^INCREASED SERUM ALT (SGPT)\r\n229^ALT (SGPT) LEVEL ABNORMAL\r\n480^ALT ELEVATED\t<INCREASED SERUM ALT (SGPT)>^INCREASED SERUM ALT (SGPT)\r\n480^ALT INCREASED\t<INCREASED SERUM ALT (SGPT)>^INCREASED SERUM ALT (SGPT)\r\n";

var expectedResult = '[{"ien":"476","synonym":"A FIB-FLUTTER\\t<ATRIAL FIBRILLATION-FLUTTER>","name":"ATRIAL FIBRILLATION-FLUTTER"},{"ien":"237","synonym":"ABDOMINAL BLOATING","name":"ABDOMINAL BLOATING"},{"ien":"236","synonym":"ABDOMINAL CRAMPS","name":"ABDOMINAL CRAMPS"},{"ien":"429","synonym":"ABDOMINAL DISCOMFORT","name":"ABDOMINAL DISCOMFORT"},{"ien":"235","synonym":"ABDOMINAL PAIN","name":"ABDOMINAL PAIN"},{"ien":"430","synonym":"ABNORMAL ECG","name":"ABNORMAL ECG"},{"ien":"477","synonym":"ABNORMAL ECG\\t<ECG ABNORMALITY>","name":"ECG ABNORMALITY"},{"ien":"477","synonym":"ABNORMAL EKG\\t<ECG ABNORMALITY>","name":"ECG ABNORMALITY"},{"ien":"316","synonym":"ABNORMAL SEXUAL FUNCTION","name":"ABNORMAL SEXUAL FUNCTION"},{"ien":"526","synonym":"ABNORMAL VISION","name":"ABNORMAL VISION"},{"ien":"309","synonym":"ABSCESS","name":"ABSCESS"},{"ien":"308","synonym":"ACIDOSIS","name":"ACIDOSIS"},{"ien":"307","synonym":"ACNE","name":"ACNE"},{"ien":"306","synonym":"ACUTE INTERSTITIAL NEPHRITIS","name":"ACUTE INTERSTITIAL NEPHRITIS"},{"ien":"305","synonym":"ACUTE RENAL FAILURE SYNDROME","name":"ACUTE RENAL FAILURE SYNDROME"},{"ien":"304","synonym":"ACUTE RENAL IMPAIRMENT","name":"ACUTE RENAL IMPAIRMENT"},{"ien":"304","synonym":"ACUTE RENAL INSUFFICIENCY\\t<ACUTE RENAL IMPAIRMENT>","name":"ACUTE RENAL IMPAIRMENT"},{"ien":"234","synonym":"ACUTE RESPIRATORY DISTRESS","name":"ACUTE RESPIRATORY DISTRESS"},{"ien":"303","synonym":"ACUTE TUBULAR NECROSIS","name":"ACUTE TUBULAR NECROSIS"},{"ien":"314","synonym":"ACUTE UPPER AIRWAY OBSTRUCTION\\t<UPPER AIRWAY OBSTRUCTION>","name":"UPPER AIRWAY OBSTRUCTION"},{"ien":"476","synonym":"AFIB-FLUTTER\\t<ATRIAL FIBRILLATION-FLUTTER>","name":"ATRIAL FIBRILLATION-FLUTTER"},{"ien":"233","synonym":"AGGRESSION\\t<AGGRESSIVE BEHAVIOR>","name":"AGGRESSIVE BEHAVIOR"},{"ien":"233","synonym":"AGGRESSIVE BEHAVIOR","name":"AGGRESSIVE BEHAVIOR"},{"ien":"36","synonym":"AGITATION","name":"AGITATION"},{"ien":"423","synonym":"AGITATION\\t<FEELING AGITATED>","name":"FEELING AGITATED"},{"ien":"37","synonym":"AGRANULOCYTOSIS","name":"AGRANULOCYTOSIS"},{"ien":"306","synonym":"AIN\\t<ACUTE INTERSTITIAL NEPHRITIS>","name":"ACUTE INTERSTITIAL NEPHRITIS"},{"ien":"498","synonym":"AION\\t<ISCHEMIC OPTIC NEUROPATHY>","name":"ISCHEMIC OPTIC NEUROPATHY"},{"ien":"527","synonym":"AIRWAY CONSTRICTION","name":"AIRWAY CONSTRICTION"},{"ien":"314","synonym":"AIRWAY OBSTRUCTION\\t<UPPER AIRWAY OBSTRUCTION>","name":"UPPER AIRWAY OBSTRUCTION"},{"ien":"232","synonym":"AKATHISIA","name":"AKATHISIA"},{"ien":"302","synonym":"AKINESIA","name":"AKINESIA"},{"ien":"479","synonym":"ALK PHOS ELEVATED\\t<INCREASED ALKALINE PHOSPHATASE>","name":"INCREASED ALKALINE PHOSPHATASE"},{"ien":"479","synonym":"ALK PHOS INCREASED\\t<INCREASED ALKALINE PHOSPHATASE>","name":"INCREASED ALKALINE PHOSPHATASE"},{"ien":"479","synonym":"ALK, ELEVATED\\t<INCREASED ALKALINE PHOSPHATASE>","name":"INCREASED ALKALINE PHOSPHATASE"},{"ien":"231","synonym":"ALKALINE PHOSPHATASE RAISED","name":"ALKALINE PHOSPHATASE RAISED"},{"ien":"479","synonym":"ALKALINE PHOSPHATASE RAISED\\t<INCREASED ALKALINE PHOSPHATASE>","name":"INCREASED ALKALINE PHOSPHATASE"},{"ien":"545","synonym":"ALLERGIC PNEUMONITIS","name":"ALLERGIC PNEUMONITIS"},{"ien":"465","synonym":"ALLERGIC RHINITIS","name":"ALLERGIC RHINITIS"},{"ien":"7","synonym":"ALOPECIA","name":"ALOPECIA"},{"ien":"480","synonym":"ALT (SGPT) ELEVATED\\t<INCREASED SERUM ALT (SGPT)>","name":"INCREASED SERUM ALT (SGPT)"},{"ien":"229","synonym":"ALT (SGPT) LEVEL ABNORMAL","name":"ALT (SGPT) LEVEL ABNORMAL"},{"ien":"480","synonym":"ALT ELEVATED\\t<INCREASED SERUM ALT (SGPT)>","name":"INCREASED SERUM ALT (SGPT)"},{"ien":"480","synonym":"ALT INCREASED\\t<INCREASED SERUM ALT (SGPT)>","name":"INCREASED SERUM ALT (SGPT)"}]';


describe('unit test to validate allergies parse the RPC response correctly', function() {
    beforeEach(function() {
    });

    it("parse the RPC data correctly", function () {
        runs(function () {
            var result = parseRpc(log, message2parse);
            result = JSON.stringify(result);
            expect(result).toBe(expectedResult);
        });
    });
});
