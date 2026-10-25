// Generated file based on package_var_deferred_table.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Symbol {
	public declare Name: string

	public declare Kind: number

	constructor(__goscriptValue?: boolean, Name$?: string, Kind$?: number) {
		this.Name = Name$ ?? ""
		this.Kind = Kind$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Symbol {
		return new Symbol(true, this.Name, this.Kind)
	}

	public __goscriptAssign(source: Symbol): this {
		this.Name = source.Name
		this.Kind = source.Kind
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Symbol",
		() => new Symbol(),
		() => [],
		Symbol,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Kind", key: "Kind", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export var Numbers: $.Slice<number>

export function __goscript_init_Numbers(): void {
	if (((Numbers) as any) === undefined) {
		Numbers = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Numbers(): $.Slice<number> {
	if (((Numbers) as any) === undefined) {
		__goscript_init_Numbers()
	}
	return Numbers
}

export function __goscript_set_Numbers(__goscriptValue: $.Slice<number>): void {
	Numbers = __goscriptValue
}

export var Symbols: $.Slice<Symbol | $.VarRef<Symbol> | null>

export function __goscript_init_Symbols(): void {
	if (((Symbols) as any) === undefined) {
		Symbols = $.arrayToSlice<Symbol | $.VarRef<Symbol> | null>([new Symbol(false, "s0", 0), new Symbol(false, "s1", 1), new Symbol(false, "s2", 2), new Symbol(false, "s3", 3), new Symbol(false, "s4", 4), new Symbol(false, "s5", 5), new Symbol(false, "s6", 6), new Symbol(false, "s7", 0), new Symbol(false, "s8", 1), new Symbol(false, "s9", 2), new Symbol(false, "s10", 3), new Symbol(false, "s11", 4), new Symbol(false, "s12", 5), new Symbol(false, "s13", 6), new Symbol(false, "s14", 0), new Symbol(false, "s15", 1), new Symbol(false, "s16", 2), new Symbol(false, "s17", 3), new Symbol(false, "s18", 4), new Symbol(false, "s19", 5), new Symbol(false, "s20", 6), new Symbol(false, "s21", 0), new Symbol(false, "s22", 1), new Symbol(false, "s23", 2), new Symbol(false, "s24", 3), new Symbol(false, "s25", 4), new Symbol(false, "s26", 5), new Symbol(false, "s27", 6), new Symbol(false, "s28", 0), new Symbol(false, "s29", 1), new Symbol(false, "s30", 2), new Symbol(false, "s31", 3), new Symbol(false, "s32", 4), new Symbol(false, "s33", 5), new Symbol(false, "s34", 6), new Symbol(false, "s35", 0), new Symbol(false, "s36", 1), new Symbol(false, "s37", 2), new Symbol(false, "s38", 3), new Symbol(false, "s39", 4), new Symbol(false, "s40", 5), new Symbol(false, "s41", 6), new Symbol(false, "s42", 0), new Symbol(false, "s43", 1), new Symbol(false, "s44", 2), new Symbol(false, "s45", 3), new Symbol(false, "s46", 4), new Symbol(false, "s47", 5), new Symbol(false, "s48", 6), new Symbol(false, "s49", 0), new Symbol(false, "s50", 1), new Symbol(false, "s51", 2), new Symbol(false, "s52", 3), new Symbol(false, "s53", 4), new Symbol(false, "s54", 5), new Symbol(false, "s55", 6), new Symbol(false, "s56", 0), new Symbol(false, "s57", 1), new Symbol(false, "s58", 2), new Symbol(false, "s59", 3), new Symbol(false, "s60", 4), new Symbol(false, "s61", 5), new Symbol(false, "s62", 6), new Symbol(false, "s63", 0), new Symbol(false, "s64", 1), new Symbol(false, "s65", 2), new Symbol(false, "s66", 3), new Symbol(false, "s67", 4), new Symbol(false, "s68", 5), new Symbol(false, "s69", 6), new Symbol(false, "s70", 0), new Symbol(false, "s71", 1), new Symbol(false, "s72", 2), new Symbol(false, "s73", 3), new Symbol(false, "s74", 4), new Symbol(false, "s75", 5), new Symbol(false, "s76", 6), new Symbol(false, "s77", 0), new Symbol(false, "s78", 1), new Symbol(false, "s79", 2), new Symbol(false, "s80", 3), new Symbol(false, "s81", 4), new Symbol(false, "s82", 5), new Symbol(false, "s83", 6), new Symbol(false, "s84", 0), new Symbol(false, "s85", 1), new Symbol(false, "s86", 2), new Symbol(false, "s87", 3), new Symbol(false, "s88", 4), new Symbol(false, "s89", 5), new Symbol(false, "s90", 6), new Symbol(false, "s91", 0), new Symbol(false, "s92", 1), new Symbol(false, "s93", 2), new Symbol(false, "s94", 3), new Symbol(false, "s95", 4), new Symbol(false, "s96", 5), new Symbol(false, "s97", 6), new Symbol(false, "s98", 0), new Symbol(false, "s99", 1), new Symbol(false, "s100", 2), new Symbol(false, "s101", 3), new Symbol(false, "s102", 4), new Symbol(false, "s103", 5), new Symbol(false, "s104", 6), new Symbol(false, "s105", 0), new Symbol(false, "s106", 1), new Symbol(false, "s107", 2), new Symbol(false, "s108", 3), new Symbol(false, "s109", 4), new Symbol(false, "s110", 5), new Symbol(false, "s111", 6), new Symbol(false, "s112", 0), new Symbol(false, "s113", 1), new Symbol(false, "s114", 2), new Symbol(false, "s115", 3), new Symbol(false, "s116", 4), new Symbol(false, "s117", 5), new Symbol(false, "s118", 6), new Symbol(false, "s119", 0), new Symbol(false, "s120", 1), new Symbol(false, "s121", 2), new Symbol(false, "s122", 3), new Symbol(false, "s123", 4), new Symbol(false, "s124", 5), new Symbol(false, "s125", 6), new Symbol(false, "s126", 0), new Symbol(false, "s127", 1), new Symbol(false, "s128", 2), new Symbol(false, "s129", 3), new Symbol(false, "s130", 4), new Symbol(false, "s131", 5), new Symbol(false, "s132", 6), new Symbol(false, "s133", 0), new Symbol(false, "s134", 1), new Symbol(false, "s135", 2), new Symbol(false, "s136", 3), new Symbol(false, "s137", 4), new Symbol(false, "s138", 5), new Symbol(false, "s139", 6), new Symbol(false, "s140", 0), new Symbol(false, "s141", 1), new Symbol(false, "s142", 2), new Symbol(false, "s143", 3), new Symbol(false, "s144", 4), new Symbol(false, "s145", 5), new Symbol(false, "s146", 6), new Symbol(false, "s147", 0), new Symbol(false, "s148", 1), new Symbol(false, "s149", 2), new Symbol(false, "s150", 3), new Symbol(false, "s151", 4), new Symbol(false, "s152", 5), new Symbol(false, "s153", 6), new Symbol(false, "s154", 0), new Symbol(false, "s155", 1), new Symbol(false, "s156", 2), new Symbol(false, "s157", 3), new Symbol(false, "s158", 4), new Symbol(false, "s159", 5), new Symbol(false, "s160", 6), new Symbol(false, "s161", 0), new Symbol(false, "s162", 1), new Symbol(false, "s163", 2), new Symbol(false, "s164", 3), new Symbol(false, "s165", 4), new Symbol(false, "s166", 5), new Symbol(false, "s167", 6), new Symbol(false, "s168", 0), new Symbol(false, "s169", 1), new Symbol(false, "s170", 2), new Symbol(false, "s171", 3), new Symbol(false, "s172", 4), new Symbol(false, "s173", 5), new Symbol(false, "s174", 6), new Symbol(false, "s175", 0), new Symbol(false, "s176", 1), new Symbol(false, "s177", 2), new Symbol(false, "s178", 3), new Symbol(false, "s179", 4), new Symbol(false, "s180", 5), new Symbol(false, "s181", 6), new Symbol(false, "s182", 0), new Symbol(false, "s183", 1), new Symbol(false, "s184", 2), new Symbol(false, "s185", 3), new Symbol(false, "s186", 4), new Symbol(false, "s187", 5), new Symbol(false, "s188", 6), new Symbol(false, "s189", 0), new Symbol(false, "s190", 1), new Symbol(false, "s191", 2), new Symbol(false, "s192", 3), new Symbol(false, "s193", 4), new Symbol(false, "s194", 5), new Symbol(false, "s195", 6), new Symbol(false, "s196", 0), new Symbol(false, "s197", 1), new Symbol(false, "s198", 2), new Symbol(false, "s199", 3), new Symbol(false, "s200", 4), new Symbol(false, "s201", 5), new Symbol(false, "s202", 6), new Symbol(false, "s203", 0), new Symbol(false, "s204", 1), new Symbol(false, "s205", 2), new Symbol(false, "s206", 3), new Symbol(false, "s207", 4), new Symbol(false, "s208", 5), new Symbol(false, "s209", 6), new Symbol(false, "s210", 0), new Symbol(false, "s211", 1), new Symbol(false, "s212", 2), new Symbol(false, "s213", 3), new Symbol(false, "s214", 4), new Symbol(false, "s215", 5), new Symbol(false, "s216", 6), new Symbol(false, "s217", 0), new Symbol(false, "s218", 1), new Symbol(false, "s219", 2), new Symbol(false, "s220", 3), new Symbol(false, "s221", 4), new Symbol(false, "s222", 5), new Symbol(false, "s223", 6), new Symbol(false, "s224", 0), new Symbol(false, "s225", 1), new Symbol(false, "s226", 2), new Symbol(false, "s227", 3), new Symbol(false, "s228", 4), new Symbol(false, "s229", 5), new Symbol(false, "s230", 6), new Symbol(false, "s231", 0), new Symbol(false, "s232", 1), new Symbol(false, "s233", 2), new Symbol(false, "s234", 3), new Symbol(false, "s235", 4), new Symbol(false, "s236", 5), new Symbol(false, "s237", 6), new Symbol(false, "s238", 0), new Symbol(false, "s239", 1), new Symbol(false, "s240", 2), new Symbol(false, "s241", 3), new Symbol(false, "s242", 4), new Symbol(false, "s243", 5), new Symbol(false, "s244", 6), new Symbol(false, "s245", 0), new Symbol(false, "s246", 1), new Symbol(false, "s247", 2), new Symbol(false, "s248", 3), new Symbol(false, "s249", 4), new Symbol(false, "s250", 5), new Symbol(false, "s251", 6), new Symbol(false, "s252", 0), new Symbol(false, "s253", 1), new Symbol(false, "s254", 2), new Symbol(false, "s255", 3), new Symbol(false, "s256", 4), new Symbol(false, "s257", 5), new Symbol(false, "s258", 6), new Symbol(false, "s259", 0)])
	}
}

export function __goscript_get_Symbols(): $.Slice<Symbol | $.VarRef<Symbol> | null> {
	if (((Symbols) as any) === undefined) {
		__goscript_init_Symbols()
	}
	return Symbols
}

export function __goscript_set_Symbols(__goscriptValue: $.Slice<Symbol | $.VarRef<Symbol> | null>): void {
	Symbols = __goscriptValue
}

export var Index: globalThis.Map<string, number> | null

export function __goscript_init_Index(): void {
	if (((Index) as any) === undefined) {
		Index = $.makeMap<string, number>([["k0", 0], ["k1", 1], ["k2", 2], ["k3", 3], ["k4", 4], ["k5", 5], ["k6", 6], ["k7", 7], ["k8", 8], ["k9", 9], ["k10", 10], ["k11", 11], ["k12", 12], ["k13", 13], ["k14", 14], ["k15", 15], ["k16", 16], ["k17", 17], ["k18", 18], ["k19", 19], ["k20", 20], ["k21", 21], ["k22", 22], ["k23", 23], ["k24", 24], ["k25", 25], ["k26", 26], ["k27", 27], ["k28", 28], ["k29", 29], ["k30", 30], ["k31", 31], ["k32", 32], ["k33", 33], ["k34", 34], ["k35", 35], ["k36", 36], ["k37", 37], ["k38", 38], ["k39", 39], ["k40", 40], ["k41", 41], ["k42", 42], ["k43", 43], ["k44", 44], ["k45", 45], ["k46", 46], ["k47", 47], ["k48", 48], ["k49", 49], ["k50", 50], ["k51", 51], ["k52", 52], ["k53", 53], ["k54", 54], ["k55", 55], ["k56", 56], ["k57", 57], ["k58", 58], ["k59", 59], ["k60", 60], ["k61", 61], ["k62", 62], ["k63", 63], ["k64", 64], ["k65", 65], ["k66", 66], ["k67", 67], ["k68", 68], ["k69", 69], ["k70", 70], ["k71", 71], ["k72", 72], ["k73", 73], ["k74", 74], ["k75", 75], ["k76", 76], ["k77", 77], ["k78", 78], ["k79", 79], ["k80", 80], ["k81", 81], ["k82", 82], ["k83", 83], ["k84", 84], ["k85", 85], ["k86", 86], ["k87", 87], ["k88", 88], ["k89", 89], ["k90", 90], ["k91", 91], ["k92", 92], ["k93", 93], ["k94", 94], ["k95", 95], ["k96", 96], ["k97", 97], ["k98", 98], ["k99", 99], ["k100", 100], ["k101", 101], ["k102", 102], ["k103", 103], ["k104", 104], ["k105", 105], ["k106", 106], ["k107", 107], ["k108", 108], ["k109", 109], ["k110", 110], ["k111", 111], ["k112", 112], ["k113", 113], ["k114", 114], ["k115", 115], ["k116", 116], ["k117", 117], ["k118", 118], ["k119", 119], ["k120", 120], ["k121", 121], ["k122", 122], ["k123", 123], ["k124", 124], ["k125", 125], ["k126", 126], ["k127", 127], ["k128", 128], ["k129", 129], ["k130", 130], ["k131", 131], ["k132", 132], ["k133", 133], ["k134", 134], ["k135", 135], ["k136", 136], ["k137", 137], ["k138", 138], ["k139", 139], ["k140", 140], ["k141", 141], ["k142", 142], ["k143", 143], ["k144", 144], ["k145", 145], ["k146", 146], ["k147", 147], ["k148", 148], ["k149", 149], ["k150", 150], ["k151", 151], ["k152", 152], ["k153", 153], ["k154", 154], ["k155", 155], ["k156", 156], ["k157", 157], ["k158", 158], ["k159", 159], ["k160", 160], ["k161", 161], ["k162", 162], ["k163", 163], ["k164", 164], ["k165", 165], ["k166", 166], ["k167", 167], ["k168", 168], ["k169", 169], ["k170", 170], ["k171", 171], ["k172", 172], ["k173", 173], ["k174", 174], ["k175", 175], ["k176", 176], ["k177", 177], ["k178", 178], ["k179", 179], ["k180", 180], ["k181", 181], ["k182", 182], ["k183", 183], ["k184", 184], ["k185", 185], ["k186", 186], ["k187", 187], ["k188", 188], ["k189", 189], ["k190", 190], ["k191", 191], ["k192", 192], ["k193", 193], ["k194", 194], ["k195", 195], ["k196", 196], ["k197", 197], ["k198", 198], ["k199", 199], ["k200", 200], ["k201", 201], ["k202", 202], ["k203", 203], ["k204", 204], ["k205", 205], ["k206", 206], ["k207", 207], ["k208", 208], ["k209", 209], ["k210", 210], ["k211", 211], ["k212", 212], ["k213", 213], ["k214", 214], ["k215", 215], ["k216", 216], ["k217", 217], ["k218", 218], ["k219", 219], ["k220", 220], ["k221", 221], ["k222", 222], ["k223", 223], ["k224", 224], ["k225", 225], ["k226", 226], ["k227", 227], ["k228", 228], ["k229", 229], ["k230", 230], ["k231", 231], ["k232", 232], ["k233", 233], ["k234", 234], ["k235", 235], ["k236", 236], ["k237", 237], ["k238", 238], ["k239", 239], ["k240", 240], ["k241", 241], ["k242", 242], ["k243", 243], ["k244", 244], ["k245", 245], ["k246", 246], ["k247", 247], ["k248", 248], ["k249", 249], ["k250", 250], ["k251", 251], ["k252", 252], ["k253", 253], ["k254", 254], ["k255", 255], ["k256", 256], ["k257", 257], ["k258", 258], ["k259", 259]])
	}
}

export function __goscript_get_Index(): globalThis.Map<string, number> | null {
	if (((Index) as any) === undefined) {
		__goscript_init_Index()
	}
	return Index
}

export function __goscript_set_Index(__goscriptValue: globalThis.Map<string, number> | null): void {
	Index = __goscriptValue
}

export var Replaced: $.Slice<number>

export function __goscript_init_Replaced(): void {
	if (((Replaced) as any) === undefined) {
		Replaced = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Replaced(): $.Slice<number> {
	if (((Replaced) as any) === undefined) {
		__goscript_init_Replaced()
	}
	return Replaced
}

export function __goscript_set_Replaced(__goscriptValue: $.Slice<number>): void {
	Replaced = __goscriptValue
}

export var Changed: $.Slice<number>

export function __goscript_init_Changed(): void {
	if (((Changed) as any) === undefined) {
		Changed = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Changed(): $.Slice<number> {
	if (((Changed) as any) === undefined) {
		__goscript_init_Changed()
	}
	return Changed
}

export function __goscript_set_Changed(__goscriptValue: $.Slice<number>): void {
	Changed = __goscriptValue
}

function __goscriptInit0(): void {
	// A write before the first read replaces the table.
	__goscript_set_Replaced($.arrayToSlice<number>([1, 2, 3]))

	// A change after a read applies to the built table.
	$.indexRef(__goscript_get_Changed()!, 0).value = 99
}

export async function main(): globalThis.Promise<void> {
	// Values of the tables are their literals.
	await $.println("numbers", $.sliceLen(__goscript_get_Numbers()), $.arrayIndex(__goscript_get_Numbers()!, 0), $.arrayIndex(__goscript_get_Numbers()!, 299))
	await $.println("symbols", $.sliceLen(__goscript_get_Symbols()), $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 5)).Name, $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 259)).Kind)
	await $.println("index", $.len(__goscript_get_Index()), $.mapGet<string, number, number>(__goscript_get_Index(), "k7", 0)[0], $.mapGet<string, number, number>(__goscript_get_Index(), "k259", 0)[0])

	// Reads see the same pointers each time.
	let p = $.arrayIndex(__goscript_get_Symbols()!, 3)
	$.pointerValue<Symbol>(p).Kind = 42
	await $.println("same", $.pointerEqual($.arrayIndex(__goscript_get_Symbols()!, 3), p), $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 3)).Kind)

	// Writes before and after the first read are kept.
	await $.println("replaced", $.sliceLen(__goscript_get_Replaced()), $.arrayIndex(__goscript_get_Replaced()!, 2))
	await $.println("changed", $.arrayIndex(__goscript_get_Changed()!, 0), $.arrayIndex(__goscript_get_Changed()!, 1))
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}
