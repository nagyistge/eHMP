'use strict';

var _ = require('underscore');

require('../../../env-setup');

var RpcParameter = require(global.VX_VISTAJS + 'RpcParameter').RpcParameter;
var RpcCall = require(global.VX_VISTAJS + 'RpcCall').RpcCall;

var RpcSerializer = require(global.VX_VISTAJS + 'RpcSerializer').RpcSerializer;
var _CIPHER_PAD = require(global.VX_VISTAJS + 'RpcSerializer')._CIPHER_PAD;
var _strPack = require(global.VX_VISTAJS + 'RpcSerializer')._strPack;
var _prependCount = require(global.VX_VISTAJS + 'RpcSerializer')._prependCount;
var _adjustForSearch = require(global.VX_VISTAJS + 'RpcSerializer')._adjustForSearch;


var ASCII_PAD = [
    [119, 107, 69, 111, 45, 90, 74, 116, 33, 100, 71, 41, 52, 57, 75, 123, 110, 88, 49, 66, 83, 36, 118, 72, 60, 38, 58, 77, 121, 102, 42, 62, 65, 101, 48, 106, 81, 87, 61, 59, 124, 35, 80, 115, 79, 96, 39, 37, 43, 114, 109, 98, 91, 103, 112, 113, 78, 44, 108, 54, 47, 104, 70, 67, 64, 68, 99, 85, 97, 32, 93, 122, 126, 82, 125, 34, 86, 92, 105, 73, 120, 117, 63, 56, 55, 50, 46, 40, 84, 89, 76, 53, 95, 51],
    [114, 75, 118, 96, 82, 59, 77, 47, 57, 66, 113, 65, 70, 37, 38, 116, 83, 115, 35, 86, 104, 41, 100, 79, 49, 68, 90, 80, 62, 32, 42, 102, 88, 39, 117, 91, 46, 52, 108, 89, 61, 45, 109, 103, 95, 99, 105, 56, 48, 50, 78, 55, 76, 84, 71, 60, 93, 33, 67, 87, 111, 58, 51, 63, 123, 43, 44, 53, 81, 125, 40, 64, 106, 97, 69, 120, 110, 36, 126, 112, 92, 73, 121, 72, 119, 122, 85, 34, 124, 107, 54, 74, 101, 98],
    [92, 112, 86, 40, 90, 74, 107, 34, 87, 81, 109, 67, 110, 33, 89, 44, 121, 64, 49, 100, 43, 126, 56, 115, 63, 91, 108, 78, 77, 120, 103, 72, 69, 116, 61, 117, 119, 124, 88, 58, 113, 83, 76, 106, 65, 73, 42, 125, 54, 122, 111, 70, 123, 84, 51, 35, 59, 99, 97, 41, 47, 104, 53, 37, 96, 80, 52, 36, 114, 93, 71, 39, 57, 101, 50, 105, 102, 95, 62, 85, 68, 75, 98, 55, 60, 118, 48, 38, 45, 32, 82, 66, 79, 46],
    [100, 101, 112, 106, 116, 51, 103, 52, 87, 41, 113, 68, 48, 86, 126, 78, 74, 97, 114, 92, 66, 32, 34, 63, 79, 89, 104, 99, 117, 91, 60, 77, 115, 37, 90, 96, 82, 73, 76, 95, 54, 58, 93, 65, 88, 45, 122, 71, 46, 35, 125, 36, 64, 118, 107, 55, 47, 53, 120, 38, 42, 109, 59, 40, 121, 98, 50, 70, 110, 43, 108, 39, 80, 119, 85, 111, 102, 49, 75, 123, 57, 44, 124, 69, 81, 105, 62, 72, 61, 67, 84, 56, 83, 33],
    [78, 90, 87, 58, 49, 125, 75, 36, 98, 121, 80, 59, 106, 107, 41, 55, 39, 96, 120, 57, 48, 66, 124, 99, 113, 64, 105, 83, 115, 69, 110, 117, 44, 40, 108, 45, 104, 102, 46, 38, 89, 95, 63, 74, 35, 82, 93, 43, 118, 111, 81, 88, 85, 56, 109, 114, 86, 91, 33, 112, 52, 116, 103, 126, 79, 77, 101, 122, 32, 67, 65, 97, 71, 70, 68, 54, 72, 53, 51, 37, 76, 47, 100, 84, 50, 60, 42, 62, 34, 123, 92, 119, 73, 61],
    [118, 67, 105, 74, 60, 111, 90, 57, 124, 112, 104, 88, 86, 78, 110, 41, 109, 32, 75, 96, 116, 47, 83, 73, 37, 93, 65, 53, 113, 79, 87, 101, 92, 38, 63, 59, 106, 84, 126, 77, 33, 102, 122, 49, 108, 62, 91, 68, 95, 48, 120, 82, 51, 50, 99, 42, 52, 46, 80, 34, 71, 123, 114, 55, 125, 69, 56, 119, 85, 103, 121, 117, 100, 70, 43, 54, 45, 58, 66, 61, 36, 40, 115, 89, 44, 76, 107, 98, 72, 97, 35, 39, 64, 81],
    [104, 118, 77, 88, 44, 39, 52, 84, 121, 59, 91, 97, 56, 47, 123, 54, 108, 126, 70, 95, 86, 34, 125, 113, 76, 73, 92, 33, 64, 120, 40, 68, 55, 98, 82, 109, 85, 72, 93, 87, 49, 53, 74, 37, 78, 48, 66, 89, 80, 107, 114, 115, 38, 57, 58, 36, 41, 90, 106, 62, 117, 124, 122, 119, 81, 61, 105, 101, 67, 45, 111, 71, 65, 46, 35, 63, 116, 102, 100, 99, 79, 51, 103, 112, 96, 83, 43, 69, 110, 32, 75, 50, 42, 60],
    [106, 100, 33, 87, 53, 91, 93, 59, 52, 39, 60, 67, 36, 47, 38, 120, 124, 114, 90, 40, 107, 123, 62, 63, 103, 104, 66, 122, 73, 70, 78, 125, 102, 65, 75, 34, 35, 96, 112, 95, 84, 113, 116, 68, 42, 49, 69, 51, 55, 88, 71, 86, 115, 64, 48, 110, 109, 83, 101, 43, 89, 54, 81, 121, 111, 45, 97, 85, 117, 37, 105, 56, 99, 61, 72, 50, 118, 74, 92, 41, 32, 82, 58, 77, 76, 98, 46, 57, 44, 119, 108, 79, 126, 80],
    [50, 84, 104, 116, 106, 69, 77, 43, 33, 61, 120, 88, 98, 41, 55, 44, 90, 86, 123, 42, 99, 105, 51, 34, 56, 64, 95, 108, 45, 72, 83, 54, 57, 76, 62, 93, 92, 65, 85, 70, 47, 81, 37, 58, 113, 68, 63, 49, 126, 109, 40, 121, 118, 79, 48, 101, 39, 60, 35, 111, 36, 112, 52, 100, 110, 73, 122, 75, 80, 124, 96, 78, 114, 107, 97, 71, 103, 46, 117, 102, 67, 82, 66, 91, 59, 32, 115, 74, 89, 119, 87, 125, 53, 38],
    [118, 66, 92, 53, 47, 122, 108, 45, 57, 121, 58, 80, 106, 124, 61, 40, 82, 39, 55, 81, 74, 73, 32, 42, 38, 67, 84, 88, 34, 112, 48, 93, 95, 51, 46, 105, 100, 99, 117, 79, 101, 102, 86, 85, 35, 111, 109, 119, 78, 90, 96, 36, 70, 115, 63, 76, 43, 49, 83, 107, 60, 44, 98, 41, 104, 77, 52, 65, 54, 91, 89, 37, 97, 68, 114, 103, 64, 126, 75, 113, 69, 87, 56, 116, 62, 72, 125, 59, 110, 33, 50, 120, 71, 123],
    [115, 70, 122, 48, 66, 111, 64, 95, 72, 102, 110, 75, 62, 76, 82, 125, 113, 87, 88, 86, 43, 68, 54, 96, 89, 50, 56, 61, 52, 67, 109, 126, 71, 47, 55, 45, 53, 65, 92, 98, 57, 33, 97, 35, 114, 80, 46, 108, 38, 77, 36, 104, 99, 51, 105, 106, 81, 107, 59, 41, 44, 84, 118, 85, 100, 60, 91, 58, 73, 34, 117, 49, 39, 78, 90, 83, 79, 119, 93, 42, 103, 120, 116, 69, 123, 101, 74, 112, 124, 121, 32, 40, 63, 37],
    [77, 64, 44, 68, 125, 124, 76, 74, 121, 71, 79, 56, 96, 36, 42, 90, 113, 72, 32, 46, 106, 62, 99, 126, 104, 60, 100, 61, 102, 105, 109, 115, 122, 118, 91, 35, 45, 53, 51, 70, 33, 43, 97, 59, 78, 67, 39, 54, 84, 57, 49, 73, 86, 63, 40, 48, 120, 38, 47, 123, 66, 41, 119, 34, 93, 81, 92, 89, 85, 87, 112, 114, 107, 52, 58, 111, 108, 37, 103, 50, 110, 69, 55, 116, 101, 82, 75, 98, 65, 80, 117, 83, 95, 88],
    [46, 109, 106, 89, 35, 95, 48, 42, 72, 60, 66, 61, 81, 43, 70, 77, 76, 54, 93, 115, 59, 114, 50, 58, 101, 56, 82, 125, 91, 105, 99, 38, 75, 65, 32, 49, 119, 123, 41, 118, 86, 53, 100, 44, 36, 117, 34, 126, 120, 68, 47, 80, 103, 63, 73, 121, 102, 116, 104, 79, 64, 67, 122, 87, 112, 37, 33, 96, 78, 52, 90, 39, 51, 45, 40, 111, 124, 74, 57, 88, 85, 69, 55, 107, 92, 84, 108, 113, 83, 98, 62, 97, 110, 71],
    [120, 86, 97, 49, 39, 93, 95, 71, 85, 60, 88, 96, 124, 92, 78, 103, 77, 63, 76, 83, 57, 123, 34, 106, 84, 37, 115, 36, 125, 121, 91, 110, 118, 116, 108, 101, 102, 66, 50, 82, 75, 74, 87, 126, 40, 47, 99, 73, 68, 67, 80, 111, 119, 52, 44, 62, 35, 122, 109, 43, 58, 53, 98, 64, 48, 54, 79, 51, 65, 112, 56, 61, 42, 55, 90, 70, 89, 33, 72, 45, 117, 69, 81, 107, 59, 32, 46, 113, 41, 105, 38, 114, 104, 100],
    [73, 93, 74, 122, 55, 65, 71, 64, 81, 88, 46, 34, 37, 51, 76, 113, 62, 77, 69, 84, 85, 111, 123, 80, 112, 95, 32, 124, 97, 54, 60, 48, 100, 89, 86, 83, 118, 56, 58, 98, 41, 126, 87, 57, 78, 75, 96, 40, 114, 39, 52, 102, 115, 38, 119, 105, 109, 92, 107, 82, 101, 67, 50, 104, 103, 61, 72, 79, 106, 36, 49, 66, 42, 47, 110, 120, 116, 44, 59, 99, 35, 121, 43, 33, 91, 63, 108, 70, 117, 90, 45, 53, 68, 125],
    [82, 114, 40, 71, 101, 54, 70, 32, 72, 120, 62, 113, 36, 109, 38, 67, 37, 77, 126, 84, 110, 44, 58, 34, 111, 39, 116, 88, 47, 42, 121, 80, 46, 123, 108, 90, 33, 89, 107, 105, 86, 104, 117, 119, 95, 60, 75, 69, 53, 97, 91, 59, 125, 87, 48, 103, 106, 115, 122, 51, 93, 64, 55, 99, 73, 50, 92, 81, 78, 63, 102, 35, 52, 112, 124, 118, 98, 49, 79, 85, 66, 68, 57, 41, 61, 45, 76, 74, 65, 43, 100, 96, 83, 56],
    [73, 126, 107, 62, 121, 124, 109, 125, 59, 100, 41, 45, 55, 68, 90, 34, 70, 101, 47, 89, 60, 66, 58, 120, 119, 111, 106, 82, 44, 86, 104, 93, 79, 48, 83, 99, 91, 96, 36, 115, 103, 56, 71, 88, 69, 33, 49, 38, 81, 114, 122, 112, 46, 95, 87, 37, 84, 78, 75, 40, 61, 74, 32, 51, 105, 42, 50, 97, 98, 117, 72, 65, 52, 67, 39, 63, 77, 118, 92, 80, 113, 123, 110, 35, 53, 54, 76, 102, 116, 85, 108, 64, 57, 43],
    [126, 65, 42, 62, 57, 32, 87, 105, 100, 70, 78, 44, 49, 75, 115, 109, 119, 81, 41, 71, 74, 77, 123, 73, 52, 58, 67, 37, 125, 35, 69, 112, 40, 63, 72, 66, 47, 114, 59, 116, 46, 38, 85, 56, 111, 124, 108, 91, 39, 76, 103, 34, 50, 104, 82, 68, 121, 90, 53, 96, 110, 98, 102, 93, 113, 106, 99, 48, 33, 122, 83, 45, 84, 107, 89, 79, 60, 95, 61, 55, 54, 97, 92, 88, 64, 36, 80, 101, 51, 43, 120, 86, 118, 117],
    [121, 89, 103, 106, 102, 34, 53, 86, 100, 72, 99, 35, 117, 65, 44, 87, 49, 105, 43, 118, 39, 54, 124, 64, 112, 114, 123, 110, 59, 68, 74, 33, 56, 40, 98, 116, 80, 71, 97, 81, 77, 46, 76, 84, 51, 111, 101, 63, 78, 66, 47, 38, 57, 62, 90, 96, 45, 125, 48, 50, 42, 37, 120, 60, 55, 108, 115, 113, 122, 52, 79, 83, 32, 126, 69, 36, 92, 82, 93, 75, 73, 91, 58, 85, 119, 67, 95, 61, 104, 41, 107, 88, 109, 70],
    [53, 58, 105, 97, 114, 46, 123, 89, 85, 55, 109, 66, 90, 82, 64, 45, 75, 124, 50, 32, 34, 43, 126, 96, 77, 37, 56, 115, 113, 52, 74, 104, 80, 111, 60, 95, 88, 92, 83, 103, 51, 87, 67, 59, 84, 117, 120, 122, 44, 102, 118, 69, 81, 49, 112, 57, 61, 119, 125, 70, 65, 73, 38, 106, 47, 107, 101, 68, 48, 99, 63, 41, 76, 78, 54, 79, 72, 86, 93, 108, 71, 121, 39, 36, 42, 62, 110, 100, 91, 40, 116, 98, 33, 35]
];

describe('RpcSerializer.js', function() {
    describe('CIPHER_PAD', function() {
        it('tests the CIPHER PAD length', function() {
            expect(_CIPHER_PAD.length).toEqual(20);
        });

        it('tests CIPHER PAD row length', function() {
            expect(_.every(_CIPHER_PAD, function(row) {
                return row.length === 94;
            })).toBe(true);
        });

        it('tests each character of CIPHER PAD', function() {
            expect(_.every(_CIPHER_PAD, function(row, rowIdx) {
                return _.every(row, function(ch, chIdx) {
                    return ch === String.fromCharCode(ASCII_PAD[rowIdx][chIdx]);
                });
            })).toBe(true);
        });
    });


    describe('literalParamString()', function() {
        it('tests RpcSerializer.literalParamString()', function() {
            var param = RpcSerializer.literalParamString('SomeParam');
            expect(param).toEqual('0009SomeParamf');
        });
    });

    describe('referenceParamString()', function() {
        it('tests RpcSerializer.referenceParamString()', function() {
            var param = RpcSerializer.referenceParamString('SomeParam');
            expect(param).toEqual('1009SomeParamf');
        });
    });

    describe('encryptedParamString()', function() {
        var param;
        it('tests sample 1', function() {
            param = RpcSerializer.encryptedParamString('lgs413', 0, 1);
            expect(param).toEqual('0008 CTgF#b!f');
        });

        it('tests sample 2', function() {
            param = RpcSerializer.encryptedParamString('lgs413', 1, 19);
            expect(param).toEqual('0008!S;|\\M&3f');
        });

        it('tests sample 3', function() {
            param = RpcSerializer.encryptedParamString('lgs413', 12, 17);
            expect(param).toEqual('0008,P2GzBT1f');
        });
    });

    describe('listParamString()', function() {
        var paramObj = {
            '"FILE"': '200',
            '"FIELDS"': '@;.01;2;4;5;.141;8;9;11;29',
            '"FLAGS"': 'IP',
            '"MAX"': '1',
            '"FROM"': '545',
            '"XREF"': '#'
        };

        var expected = '2006"FILE"003200t008"FIELDS"026@;.01;2;4;5;.141;8;9;11;29t007"FLAGS"002IPt005"MAX"0011t006"FROM"003545t006"XREF"001#f';
        var actual = RpcSerializer.listParamString(paramObj);

        it('tests RpcSerializer.listParamString()', function() {
            expect(actual).toEqual(expected);
        });
    });


    describe('strPack()', function() {
        it('verify', function() {
            expect(_strPack('something!5here')).toEqual('015something!5here');
        });
    });

    describe('prependCount()', function() {
        it('verify', function() {
            expect(_prependCount('SomeString', 10)).toEqual('\nSomeString');
        });
    });

    describe('adjustForSearch()', function() {
        it('tests with a number', function() {
            expect(_adjustForSearch('245')).toEqual(244);
        });

        it('tests with a string', function() {
            expect(_adjustForSearch('Snurd')).toEqual('Snurc~');
        });
    });


    describe('buildRpcGreetingString()', function() {
        it('verify', function() {
            var result = RpcSerializer.buildRpcGreetingString('127.0.0.1', 'localhost');
            expect(result).toEqual('[XWB]10304\nTCPConnect500140009127.0.0.1ff00010f00140009localhostff\u0004');
        });
    });

    describe('buildRpcSignOffString', function() {
        it('verify', function() {
            var result = RpcSerializer.buildRpcSignOffString();
            expect(result).toEqual('[XWB]10304\u0005#BYE#\u0004');
        });
    });

    describe('buildRpcString()', function() {
        it('tests with undefined', function() {
            var result = RpcSerializer.buildRpcString();
            expect(result).toBeUndefined();
        });

        it('tests with no parameters', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC');
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC54f\u0004');
        });

        it('tests with literal parameters in array', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC', [RpcParameter.literal('1'), RpcParameter.literal('12')]);
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC500011f000212f\u0004');
        });

        it('tests with literal parameters as arguments', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC', RpcParameter.literal('1'), RpcParameter.literal('12'));
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC500011f000212f\u0004');
        });

        it('tests with reference parameter', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC', [RpcParameter.reference('1')]);
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC510011f\u0004');
        });

        it('tests with encrypted parameter', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC', [RpcParameter.encrypted('test', 1, 2)]);
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC50006!,O@,"f\u0004');
        });

        it('tests with list parameter', function() {
            var result = RpcSerializer.buildRpcString('VPRCRPC RPC', [RpcParameter.list({
                '"x"': 'x',
                '"y"': 'y'
            })]);
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC52003"x"001xt003"y"001yf\u0004');
        });

        it('tests with RpcCall', function() {
            var result = RpcSerializer.buildRpcString(RpcCall.create('VPRCRPC RPC', 'test1', 'test2'));
            expect(result).toEqual('[XWB]11302\u00051.108\u000BVPRCRPC RPC50005test1f0005test2f\u0004');
        });
    });
});