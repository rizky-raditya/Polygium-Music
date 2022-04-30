/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e((t=t||self).bootstrap={},t.jQuery)}(this,function(t,p){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function l(o){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},e=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.forEach(function(t){var e,n,i;e=o,i=r[n=t],n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i})}return o}p=p&&p.hasOwnProperty("default")?p.default:p;var e="transitionend";function n(t){var e=this,n=!1;return p(this).one(m.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||m.triggerTransitionEnd(e)},t),this}var m={TRANSITION_END:"bsTransitionEnd",getUID:function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=p(t).css("transition-duration"),n=p(t).css("transition-delay"),i=parseFloat(e),o=parseFloat(n);return i||o?(e=e.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(e)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){p(t).trigger(e)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=e[i],s=r&&m.isElement(r)?"element":(a=r,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(o).test(s))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+o+'".')}var a},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"!=typeof t.getRootNode)return t instanceof ShadowRoot?t:t.parentNode?m.findShadowRoot(t.parentNode):null;var e=t.getRootNode();return e instanceof ShadowRoot?e:null}};p.fn.emulateTransitionEnd=n,p.event.special[m.TRANSITION_END]={bindType:e,delegateType:e,handle:function(t){if(p(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var o="alert",r="bs.alert",a="."+r,c=p.fn[o],h={CLOSE:"close"+a,CLOSED:"closed"+a,CLICK_DATA_API:"click"+a+".data-api"},u="alert",f="fade",d="show",g=function(){function i(t){this._element=t}var t=i.prototype;return t.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},t.dispose=function(){p.removeData(this._element,r),this._element=null},t._getRootElement=function(t){var e=m.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=p(t).closest("."+u)[0]),n},t._triggerCloseEvent=function(t){var e=p.Event(h.CLOSE);return p(t).trigger(e),e},t._removeElement=function(e){var n=this;if(p(e).removeClass(d),p(e).hasClass(f)){var t=m.getTransitionDurationFromElement(e);p(e).one(m.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(t)}else this._destroyElement(e)},t._destroyElement=function(t){p(t).detach().trigger(h.CLOSED).remove()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(r);e||(e=new i(this),t.data(r,e)),"close"===n&&e[n](this)})},i._handleDismiss=function(e){return function(t){t&&t.preventDefault(),e.close(this)}},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),i}();p(document).on(h.CLICK_DATA_API,'[data-dismiss="alert"]',g._handleDismiss(new g)),p.fn[o]=g._jQueryInterface,p.fn[o].Constructor=g,p.fn[o].noConflict=function(){return p.fn[o]=c,g._jQueryInterface};var _="button",v="bs.button",y="."+v,E=".data-api",b=p.fn[_],w="active",C="btn",T="focus",S='[data-toggle^="button"]',D='[data-toggle="buttons"]',I='input:not([type="hidden"])',A=".active",O=".btn",N={CLICK_DATA_API:"click"+y+E,FOCUS_BLUR_DATA_API:"focus"+y+E+" blur"+y+E},k=function(){function n(t){this._element=t}var t=n.prototype;return t.toggle=function(){var t=!0,e=!0,n=p(this._element).closest(D)[0];if(n){var i=this._element.querySelector(I);if(i){if("radio"===i.type)if(i.checked&&this._element.classList.contains(w))t=!1;else{var o=n.querySelector(A);o&&p(o).removeClass(w)}if(t){if(i.hasAttribute("disabled")||n.hasAttribute("disabled")||i.classList.contains("disabled")||n.classList.contains("disabled"))return;i.checked=!this._element.classList.contains(w),p(i).trigger("change")}i.focus(),e=!1}}e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(w)),t&&p(this._element).toggleClass(w)},t.dispose=function(){p.removeData(this._element,v),this._element=null},n._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(v);t||(t=new n(this),p(this).data(v,t)),"toggle"===e&&t[e]()})},s(n,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),n}();p(document).on(N.CLICK_DATA_API,S,function(t){t.preventDefault();var e=t.target;p(e).hasClass(C)||(e=p(e).closest(O)),k._jQueryInterface.call(p(e),"toggle")}).on(N.FOCUS_BLUR_DATA_API,S,function(t){var e=p(t.target).closest(O)[0];p(e).toggleClass(T,/^focus(in)?$/.test(t.type))}),p.fn[_]=k._jQueryInterface,p.fn[_].Constructor=k,p.fn[_].noConflict=function(){return p.fn[_]=b,k._jQueryInterface};var L="carousel",x="bs.carousel",P="."+x,H=".data-api",j=p.fn[L],R={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},F={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},M="next",W="prev",U="left",B="right",q={SLIDE:"slide"+P,SLID:"slid"+P,KEYDOWN:"keydown"+P,MOUSEENTER:"mouseenter"+P,MOUSELEAVE:"mouseleave"+P,TOUCHSTART:"touchstart"+P,TOUCHMOVE:"touchmove"+P,TOUCHEND:"touchend"+P,POINTERDOWN:"pointerdown"+P,POINTERUP:"pointerup"+P,DRAG_START:"dragstart"+P,LOAD_DATA_API:"load"+P+H,CLICK_DATA_API:"click"+P+H},K="carousel",Q="active",V="slide",Y="carousel-item-right",z="carousel-item-left",X="carousel-item-next",G="carousel-item-prev",$="pointer-event",J=".active",Z=".active.carousel-item",tt=".carousel-item",et=".carousel-item img",nt=".carousel-item-next, .carousel-item-prev",it=".carousel-indicators",ot="[data-slide], [data-slide-to]",rt='[data-ride="carousel"]',st={TOUCH:"touch",PEN:"pen"},at=function(){function r(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(it),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var t=r.prototype;return t.next=function(){this._isSliding||this._slide(M)},t.nextWhenVisible=function(){!document.hidden&&p(this._element).is(":visible")&&"hidden"!==p(this._element).css("visibility")&&this.next()},t.prev=function(){this._isSliding||this._slide(W)},t.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(nt)&&(m.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},t.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},t.to=function(t){var e=this;this._activeElement=this._element.querySelector(Z);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)p(this._element).one(q.SLID,function(){return e.to(t)});else{if(n===t)return this.pause(),void this.cycle();var i=n<t?M:W;this._slide(i,this._items[t])}},t.dispose=function(){p(this._element).off(P),p.removeData(this._element,x),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},t._getConfig=function(t){return t=l({},R,t),m.typeCheckConfig(L,t,F),t},t._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;0<e&&this.prev(),e<0&&this.next()}},t._addEventListeners=function(){var e=this;this._config.keyboard&&p(this._element).on(q.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&p(this._element).on(q.MOUSEENTER,function(t){return e.pause(t)}).on(q.MOUSELEAVE,function(t){return e.cycle(t)}),this._config.touch&&this._addTouchEventListeners()},t._addTouchEventListeners=function(){var n=this;if(this._touchSupported){var e=function(t){n._pointerEvent&&st[t.originalEvent.pointerType.toUpperCase()]?n.touchStartX=t.originalEvent.clientX:n._pointerEvent||(n.touchStartX=t.originalEvent.touches[0].clientX)},i=function(t){n._pointerEvent&&st[t.originalEvent.pointerType.toUpperCase()]&&(n.touchDeltaX=t.originalEvent.clientX-n.touchStartX),n._handleSwipe(),"hover"===n._config.pause&&(n.pause(),n.touchTimeout&&clearTimeout(n.touchTimeout),n.touchTimeout=setTimeout(function(t){return n.cycle(t)},500+n._config.interval))};p(this._element.querySelectorAll(et)).on(q.DRAG_START,function(t){return t.preventDefault()}),this._pointerEvent?(p(this._element).on(q.POINTERDOWN,function(t){return e(t)}),p(this._element).on(q.POINTERUP,function(t){return i(t)}),this._element.classList.add($)):(p(this._element).on(q.TOUCHSTART,function(t){return e(t)}),p(this._element).on(q.TOUCHMOVE,function(t){var e;(e=t).originalEvent.touches&&1<e.originalEvent.touches.length?n.touchDeltaX=0:n.touchDeltaX=e.originalEvent.touches[0].clientX-n.touchStartX}),p(this._element).on(q.TOUCHEND,function(t){return i(t)}))}},t._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},t._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(tt)):[],this._items.indexOf(t)},t._getItemByDirection=function(t,e){var n=t===M,i=t===W,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+(t===W?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},t._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(this._element.querySelector(Z)),o=p.Event(q.SLIDE,{relatedTarget:t,direction:e,from:i,to:n});return p(this._element).trigger(o),o},t._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll(J));p(e).removeClass(Q);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&p(n).addClass(Q)}},t._slide=function(t,e){var n,i,o,r=this,s=this._element.querySelector(Z),a=this._getItemIndex(s),l=e||s&&this._getItemByDirection(t,s),c=this._getItemIndex(l),h=Boolean(this._interval);if(o=t===M?(n=z,i=X,U):(n=Y,i=G,B),l&&p(l).hasClass(Q))this._isSliding=!1;else if(!this._triggerSlideEvent(l,o).isDefaultPrevented()&&s&&l){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(l);var u=p.Event(q.SLID,{relatedTarget:l,direction:o,from:a,to:c});if(p(this._element).hasClass(V)){p(l).addClass(i),m.reflow(l),p(s).addClass(n),p(l).addClass(n);var f=parseInt(l.getAttribute("data-interval"),10);this._config.interval=f?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,f):this._config.defaultInterval||this._config.interval;var d=m.getTransitionDurationFromElement(s);p(s).one(m.TRANSITION_END,function(){p(l).removeClass(n+" "+i).addClass(Q),p(s).removeClass(Q+" "+i+" "+n),r._isSliding=!1,setTimeout(function(){return p(r._element).trigger(u)},0)}).emulateTransitionEnd(d)}else p(s).removeClass(Q),p(l).addClass(Q),this._isSliding=!1,p(this._element).trigger(u);h&&this.cycle()}},r._jQueryInterface=function(i){return this.each(function(){var t=p(this).data(x),e=l({},R,p(this).data());"object"==typeof i&&(e=l({},e,i));var n="string"==typeof i?i:e.slide;if(t||(t=new r(this,e),p(this).data(x,t)),"number"==typeof i)t.to(i);else if("string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}else e.interval&&e.ride&&(t.pause(),t.cycle())})},r._dataApiClickHandler=function(t){var e=m.getSelectorFromElement(this);if(e){var n=p(e)[0];if(n&&p(n).hasClass(K)){var i=l({},p(n).data(),p(this).data()),o=this.getAttribute("data-slide-to");o&&(i.interval=!1),r._jQueryInterface.call(p(n),i),o&&p(n).data(x).to(o),t.preventDefault()}}},s(r,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return R}}]),r}();p(document).on(q.CLICK_DATA_API,ot,at._dataApiClickHandler),p(window).on(q.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(rt)),e=0,n=t.length;e<n;e++){var i=p(t[e]);at._jQueryInterface.call(i,i.data())}}),p.fn[L]=at._jQueryInterface,p.fn[L].Constructor=at,p.fn[L].noConflict=function(){return p.fn[L]=j,at._jQueryInterface};var lt="collapse",ct="bs.collapse",ht="."+ct,ut=p.fn[lt],ft={toggle:!0,parent:""},dt={toggle:"boolean",parent:"(string|element)"},pt={SHOW:"show"+ht,SHOWN:"shown"+ht,HIDE:"hide"+ht,HIDDEN:"hidden"+ht,CLICK_DATA_API:"click"+ht+".data-api"},mt="show",gt="collapse",_t="collapsing",vt="collapsed",yt="width",Et="height",bt=".show, .collapsing",wt='[data-toggle="collapse"]',Ct=function(){function a(e,t){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(t),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(wt)),i=0,o=n.length;i<o;i++){var r=n[i],s=m.getSelectorFromElement(r),a=[].slice.call(document.querySelectorAll(s)).filter(function(t){return t===e});null!==s&&0<a.length&&(this._selector=s,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var t=a.prototype;return t.toggle=function(){p(this._element).hasClass(mt)?this.hide():this.show()},t.show=function(){var t,e,n=this;if(!this._isTransitioning&&!p(this._element).hasClass(mt)&&(this._parent&&0===(t=[].slice.call(this._parent.querySelectorAll(bt)).filter(function(t){return"string"==typeof n._config.parent?t.getAttribute("data-parent")===n._config.parent:t.classList.contains(gt)})).length&&(t=null),!(t&&(e=p(t).not(this._selector).data(ct))&&e._isTransitioning))){var i=p.Event(pt.SHOW);if(p(this._element).trigger(i),!i.isDefaultPrevented()){t&&(a._jQueryInterface.call(p(t).not(this._selector),"hide"),e||p(t).data(ct,null));var o=this._getDimension();p(this._element).removeClass(gt).addClass(_t),this._element.style[o]=0,this._triggerArray.length&&p(this._triggerArray).removeClass(vt).attr("aria-expanded",!0),this.setTransitioning(!0);var r="scroll"+(o[0].toUpperCase()+o.slice(1)),s=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){p(n._element).removeClass(_t).addClass(gt).addClass(mt),n._element.style[o]="",n.setTransitioning(!1),p(n._element).trigger(pt.SHOWN)}).emulateTransitionEnd(s),this._element.style[o]=this._element[r]+"px"}}},t.hide=function(){var t=this;if(!this._isTransitioning&&p(this._element).hasClass(mt)){var e=p.Event(pt.HIDE);if(p(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",m.reflow(this._element),p(this._element).addClass(_t).removeClass(gt).removeClass(mt);var i=this._triggerArray.length;if(0<i)for(var o=0;o<i;o++){var r=this._triggerArray[o],s=m.getSelectorFromElement(r);if(null!==s)p([].slice.call(document.querySelectorAll(s))).hasClass(mt)||p(r).addClass(vt).attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var a=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){t.setTransitioning(!1),p(t._element).removeClass(_t).addClass(gt).trigger(pt.HIDDEN)}).emulateTransitionEnd(a)}}},t.setTransitioning=function(t){this._isTransitioning=t},t.dispose=function(){p.removeData(this._element,ct),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},t._getConfig=function(t){return(t=l({},ft,t)).toggle=Boolean(t.toggle),m.typeCheckConfig(lt,t,dt),t},t._getDimension=function(){return p(this._element).hasClass(yt)?yt:Et},t._getParent=function(){var t,n=this;m.isElement(this._config.parent)?(t=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(t=this._config.parent[0])):t=document.querySelector(this._config.parent);var e='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',i=[].slice.call(t.querySelectorAll(e));return p(i).each(function(t,e){n._addAriaAndCollapsedClass(a._getTargetFromElement(e),[e])}),t},t._addAriaAndCollapsedClass=function(t,e){var n=p(t).hasClass(mt);e.length&&p(e).toggleClass(vt,!n).attr("aria-expanded",n)},a._getTargetFromElement=function(t){var e=m.getSelectorFromElement(t);return e?document.querySelector(e):null},a._jQueryInterface=function(i){return this.each(function(){var t=p(this),e=t.data(ct),n=l({},ft,t.data(),"object"==typeof i&&i?i:{});if(!e&&n.toggle&&/show|hide/.test(i)&&(n.toggle=!1),e||(e=new a(this,n),t.data(ct,e)),"string"==typeof i){if("undefined"==typeof e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return ft}}]),a}();p(document).on(pt.CLICK_DATA_API,wt,function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var n=p(this),e=m.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(e));p(i).each(function(){var t=p(this),e=t.data(ct)?"toggle":n.data();Ct._jQueryInterface.call(t,e)})}),p.fn[lt]=Ct._jQueryInterface,p.fn[lt].Constructor=Ct,p.fn[lt].noConflict=function(){return p.fn[lt]=ut,Ct._jQueryInterface};for(var Tt="undefined"!=typeof window&&"undefined"!=typeof document,St=["Edge","Trident","Firefox"],Dt=0,It=0;It<St.length;It+=1)if(Tt&&0<=navigator.userAgent.indexOf(St[It])){Dt=1;break}var At=Tt&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},Dt))}};function Ot(t){return t&&"[object Function]"==={}.toString.call(t)}function Nt(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function kt(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function Lt(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=Nt(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:Lt(kt(t))}var xt=Tt&&!(!window.MSInputMethodContext||!document.documentMode),Pt=Tt&&/MSIE 10/.test(navigator.userAgent);function Ht(t){return 11===t?xt:10===t?Pt:xt||Pt}function jt(t){if(!t)return document.documentElement;for(var e=Ht(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===Nt(n,"position")?jt(n):n:t?t.ownerDocument.documentElement:document.documentElement}function Rt(t){return null!==t.parentNode?Rt(t.parentNode):t}function Ft(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var s,a,l=r.commonAncestorContainer;if(t!==l&&e!==l||i.contains(o))return"BODY"===(a=(s=l).nodeName)||"HTML"!==a&&jt(s.firstElementChild)!==s?jt(l):l;var c=Rt(t);return c.host?Ft(c.host,e):Ft(t,Rt(e).host)}function Mt(t){var e="top"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"!==n&&"HTML"!==n)return t[e];var i=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||i)[e]}function Wt(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+i+"Width"],10)}function Ut(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],Ht(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function Bt(t){var e=t.body,n=t.documentElement,i=Ht(10)&&getComputedStyle(n);return{height:Ut("Height",e,n,i),width:Ut("Width",e,n,i)}}var qt=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),Kt=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},Qt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function Vt(t){return Qt({},t,{right:t.left+t.width,bottom:t.top+t.height})}function Yt(t){var e={};try{if(Ht(10)){e=t.getBoundingClientRect();var n=Mt(t,"top"),i=Mt(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?Bt(t.ownerDocument):{},s=r.width||t.clientWidth||o.right-o.left,a=r.height||t.clientHeight||o.bottom-o.top,l=t.offsetWidth-s,c=t.offsetHeight-a;if(l||c){var h=Nt(t);l-=Wt(h,"x"),c-=Wt(h,"y"),o.width-=l,o.height-=c}return Vt(o)}function zt(t,e){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=Ht(10),o="HTML"===e.nodeName,r=Yt(t),s=Yt(e),a=Lt(t),l=Nt(e),c=parseFloat(l.borderTopWidth,10),h=parseFloat(l.borderLeftWidth,10);n&&o&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var u=Vt({top:r.top-s.top-c,left:r.left-s.left-h,width:r.width,height:r.height});if(u.marginTop=0,u.marginLeft=0,!i&&o){var f=parseFloat(l.marginTop,10),d=parseFloat(l.marginLeft,10);u.top-=c-f,u.bottom-=c-f,u.left-=h-d,u.right-=h-d,u.marginTop=f,u.marginLeft=d}return(i&&!n?e.contains(a):e===a&&"BODY"!==a.nodeName)&&(u=function(t,e){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=Mt(e,"top"),o=Mt(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}(u,e)),u}function Xt(t){if(!t||!t.parentElement||Ht())return document.documentElement;for(var e=t.parentElement;e&&"none"===Nt(e,"transform");)e=e.parentElement;return e||document.documentElement}function Gt(t,e,n,i){var o=4<arguments.length&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},s=o?Xt(t):Ft(t,e);if("viewport"===i)r=function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=zt(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),s=e?0:Mt(n),a=e?0:Mt(n,"left");return Vt({top:s-i.top+i.marginTop,left:a-i.left+i.marginLeft,width:o,height:r})}(s,o);else{var a=void 0;"scrollParent"===i?"BODY"===(a=Lt(kt(e))).nodeName&&(a=t.ownerDocument.documentElement):a="window"===i?t.ownerDocument.documentElement:i;var l=zt(a,s,o);if("HTML"!==a.nodeName||function t(e){var n=e.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===Nt(e,"position"))return!0;var i=kt(e);return!!i&&t(i)}(s))r=l;else{var c=Bt(t.ownerDocument),h=c.height,u=c.width;r.top+=l.top-l.marginTop,r.bottom=h+l.top,r.left+=l.left-l.marginLeft,r.right=u+l.left}}var f="number"==typeof(n=n||0);return r.left+=f?n:n.left||0,r.top+=f?n:n.top||0,r.right-=f?n:n.right||0,r.bottom-=f?n:n.bottom||0,r}function $t(t,e,i,n,o){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var s=Gt(i,n,r,o),a={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},l=Object.keys(a).map(function(t){return Qt({key:t},a[t],{area:(e=a[t],e.width*e.height)});var e}).sort(function(t,e){return e.area-t.area}),c=l.filter(function(t){var e=t.width,n=t.height;return e>=i.clientWidth&&n>=i.clientHeight}),h=0<c.length?c[0].key:l[0].key,u=t.split("-")[1];return h+(u?"-"+u:"")}function Jt(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return zt(n,i?Xt(e):Ft(e,n),i)}function Zt(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function te(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function ee(t,e,n){n=n.split("-")[0];var i=Zt(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),s=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return o[s]=e[s]+e[l]/2-i[l]/2,o[a]=n===a?e[a]-i[c]:e[te(a)],o}function ne(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function ie(t,n,e){return(void 0===e?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=ne(t,function(t){return t[e]===n});return t.indexOf(i)}(t,"name",e))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var e=t.function||t.fn;t.enabled&&Ot(e)&&(n.offsets.popper=Vt(n.offsets.popper),n.offsets.reference=Vt(n.offsets.reference),n=e(n,t))}),n}function oe(t,n){return t.some(function(t){var e=t.name;return t.enabled&&e===n})}function re(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if("undefined"!=typeof document.body.style[r])return r}return null}function se(t){var e=t.ownerDocument;return e?e.defaultView:window}function ae(t,e,n,i){n.updateBound=i,se(t).addEventListener("resize",n.updateBound,{passive:!0});var o=Lt(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,s=r?e.ownerDocument.defaultView:e;s.addEventListener(n,i,{passive:!0}),r||t(Lt(s.parentNode),n,i,o),o.push(s)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function le(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,se(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function ce(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function he(n,i){Object.keys(i).forEach(function(t){var e="";-1!==["width","height","top","right","bottom","left"].indexOf(t)&&ce(i[t])&&(e="px"),n.style[t]=i[t]+e})}var ue=Tt&&/Firefox/i.test(navigator.userAgent);function fe(t,e,n){var i=ne(t,function(t){return t.name===e}),o=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!o){var r="`"+e+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var de=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],pe=de.slice(3);function me(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=pe.indexOf(t),i=pe.slice(n+1).concat(pe.slice(0,n));return e?i.reverse():i}var ge="flip",_e="clockwise",ve="counterclockwise";function ye(t,o,r,e){var s=[0,0],a=-1!==["right","left"].indexOf(e),n=t.split(/(\+|\-)/).map(function(t){return t.trim()}),i=n.indexOf(ne(n,function(t){return-1!==t.search(/,|\s/)}));n[i]&&-1===n[i].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==i?[n.slice(0,i).concat([n[i].split(l)[0]]),[n[i].split(l)[1]].concat(n.slice(i+1))]:[n];return(c=c.map(function(t,e){var n=(1===e?!a:a)?"height":"width",i=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,i=!0,t):i?(t[t.length-1]+=e,i=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],s=o[2];if(!r)return t;if(0!==s.indexOf("%"))return"vh"!==s&&"vw"!==s?r:("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return Vt(a)[e]/100*r}(t,n,o,r)})})).forEach(function(n,i){n.forEach(function(t,e){ce(t)&&(s[i]+=t*("-"===n[e-1]?-1:1))})}),s}var Ee={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",h={start:Kt({},l,r[l]),end:Kt({},l,r[l]+r[c]-s[c])};t.offsets.popper=Qt({},s,h[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,s=o.reference,a=i.split("-")[0],l=void 0;return l=ce(+n)?[+n,0]:ye(n,r,s,a),"left"===a?(r.top+=l[0],r.left-=l[1]):"right"===a?(r.top+=l[0],r.left+=l[1]):"top"===a?(r.left+=l[0],r.top-=l[1]):"bottom"===a&&(r.left+=l[0],r.top+=l[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,i){var e=i.boundariesElement||jt(t.instance.popper);t.instance.reference===e&&(e=jt(e));var n=re("transform"),o=t.instance.popper.style,r=o.top,s=o.left,a=o[n];o.top="",o.left="",o[n]="";var l=Gt(t.instance.popper,t.instance.reference,i.padding,e,t.positionFixed);o.top=r,o.left=s,o[n]=a,i.boundaries=l;var c=i.priority,h=t.offsets.popper,u={primary:function(t){var e=h[t];return h[t]<l[t]&&!i.escapeWithReference&&(e=Math.max(h[t],l[t])),Kt({},t,e)},secondary:function(t){var e="right"===t?"left":"top",n=h[e];return h[t]>l[t]&&!i.escapeWithReference&&(n=Math.min(h[e],l[t]-("right"===t?h.width:h.height))),Kt({},e,n)}};return c.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";h=Qt({},h,u[e](t))}),t.offsets.popper=h,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[c]),n[l]>r(i[a])&&(t.offsets.popper[l]=r(i[a])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!fe(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,s=r.popper,a=r.reference,l=-1!==["left","right"].indexOf(o),c=l?"height":"width",h=l?"Top":"Left",u=h.toLowerCase(),f=l?"left":"top",d=l?"bottom":"right",p=Zt(i)[c];a[d]-p<s[u]&&(t.offsets.popper[u]-=s[u]-(a[d]-p)),a[u]+p>s[d]&&(t.offsets.popper[u]+=a[u]+p-s[d]),t.offsets.popper=Vt(t.offsets.popper);var m=a[u]+a[c]/2-p/2,g=Nt(t.instance.popper),_=parseFloat(g["margin"+h],10),v=parseFloat(g["border"+h+"Width"],10),y=m-t.offsets.popper[u]-_-v;return y=Math.max(Math.min(s[c]-p,y),0),t.arrowElement=i,t.offsets.arrow=(Kt(n={},u,Math.round(y)),Kt(n,f,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(p,m){if(oe(p.instance.modifiers,"inner"))return p;if(p.flipped&&p.placement===p.originalPlacement)return p;var g=Gt(p.instance.popper,p.instance.reference,m.padding,m.boundariesElement,p.positionFixed),_=p.placement.split("-")[0],v=te(_),y=p.placement.split("-")[1]||"",E=[];switch(m.behavior){case ge:E=[_,v];break;case _e:E=me(_);break;case ve:E=me(_,!0);break;default:E=m.behavior}return E.forEach(function(t,e){if(_!==t||E.length===e+1)return p;_=p.placement.split("-")[0],v=te(_);var n,i=p.offsets.popper,o=p.offsets.reference,r=Math.floor,s="left"===_&&r(i.right)>r(o.left)||"right"===_&&r(i.left)<r(o.right)||"top"===_&&r(i.bottom)>r(o.top)||"bottom"===_&&r(i.top)<r(o.bottom),a=r(i.left)<r(g.left),l=r(i.right)>r(g.right),c=r(i.top)<r(g.top),h=r(i.bottom)>r(g.bottom),u="left"===_&&a||"right"===_&&l||"top"===_&&c||"bottom"===_&&h,f=-1!==["top","bottom"].indexOf(_),d=!!m.flipVariations&&(f&&"start"===y&&a||f&&"end"===y&&l||!f&&"start"===y&&c||!f&&"end"===y&&h);(s||u||d)&&(p.flipped=!0,(s||u)&&(_=E[e+1]),d&&(y="end"===(n=y)?"start":"start"===n?"end":n),p.placement=_+(y?"-"+y:""),p.offsets.popper=Qt({},p.offsets.popper,ee(p.instance.popper,p.offsets.reference,p.placement)),p=ie(p.instance.modifiers,p,"flip"))}),p},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=r[n]-(a?o[s?"width":"height"]:0),t.placement=te(e),t.offsets.popper=Vt(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!fe(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=ne(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=ne(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s,a,l,c,h,u,f,d,p,m,g,_,v,y,E=void 0!==r?r:e.gpuAcceleration,b=jt(t.instance.popper),w=Yt(b),C={position:o.position},T=(s=t,a=window.devicePixelRatio<2||!ue,l=s.offsets,c=l.popper,h=l.reference,u=Math.round,f=Math.floor,d=function(t){return t},p=u(h.width),m=u(c.width),g=-1!==["left","right"].indexOf(s.placement),_=-1!==s.placement.indexOf("-"),y=a?u:d,{left:(v=a?g||_||p%2==m%2?u:f:d)(p%2==1&&m%2==1&&!_&&a?c.left-1:c.left),top:y(c.top),bottom:y(c.bottom),right:v(c.right)}),S="bottom"===n?"top":"bottom",D="right"===i?"left":"right",I=re("transform"),A=void 0,O=void 0;if(O="bottom"===S?"HTML"===b.nodeName?-b.clientHeight+T.bottom:-w.height+T.bottom:T.top,A="right"===D?"HTML"===b.nodeName?-b.clientWidth+T.right:-w.width+T.right:T.left,E&&I)C[I]="translate3d("+A+"px, "+O+"px, 0)",C[S]=0,C[D]=0,C.willChange="transform";else{var N="bottom"===S?-1:1,k="right"===D?-1:1;C[S]=O*N,C[D]=A*k,C.willChange=S+", "+D}var L={"x-placement":t.placement};return t.attributes=Qt({},L,t.attributes),t.styles=Qt({},C,t.styles),t.arrowStyles=Qt({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return he(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach(function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)}),t.arrowElement&&Object.keys(t.arrowStyles).length&&he(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=Jt(o,e,t,n.positionFixed),s=$t(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",s),he(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},be=function(){function r(t,e){var n=this,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=At(this.update.bind(this)),this.options=Qt({},r.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=e&&e.jquery?e[0]:e,this.options.modifiers={},Object.keys(Qt({},r.Defaults.modifiers,i.modifiers)).forEach(function(t){n.options.modifiers[t]=Qt({},r.Defaults.modifiers[t]||{},i.modifiers?i.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return Qt({name:t},n.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&Ot(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return qt(r,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=Jt(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=$t(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=ee(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=ie(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,oe(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[re("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=ae(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return le.call(this)}}]),r}();be.Utils=("undefined"!=typeof window?window:global).PopperUtils,be.placements=de,be.Defaults=Ee;var we="dropdown",Ce="bs.dropdown",Te="."+Ce,Se=".data-api",De=p.fn[we],Ie=new RegExp("38|40|27"),Ae={HIDE:"hide"+Te,HIDDEN:"hidden"+Te,SHOW:"show"+Te,SHOWN:"shown"+Te,CLICK:"click"+Te,CLICK_DATA_API:"click"+Te+Se,KEYDOWN_DATA_API:"keydown"+Te+Se,KEYUP_DATA_API:"keyup"+Te+Se},Oe="disabled",Ne="show",ke="dropup",Le="dropright",xe="dropleft",Pe="dropdown-menu-right",He="position-static",je='[data-toggle="dropdown"]',Re=".dropdown form",Fe=".dropdown-menu",Me=".navbar-nav",We=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Ue="top-start",Be="top-end",qe="bottom-start",Ke="bottom-end",Qe="right-start",Ve="left-start",Ye={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},ze={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},Xe=function(){function c(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var t=c.prototype;return t.toggle=function(){if(!this._element.disabled&&!p(this._element).hasClass(Oe)){var t=c._getParentFromElement(this._element),e=p(this._menu).hasClass(Ne);if(c._clearMenus(),!e){var n={relatedTarget:this._element},i=p.Event(Ae.SHOW,n);if(p(t).trigger(i),!i.isDefaultPrevented()){if(!this._inNavbar){if("undefined"==typeof be)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var o=this._element;"parent"===this._config.reference?o=t:m.isElement(this._config.reference)&&(o=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(o=this._config.reference[0])),"scrollParent"!==this._config.boundary&&p(t).addClass(He),this._popper=new be(o,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===p(t).closest(Me).length&&p(document.body).children().on("mouseover",null,p.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),p(this._menu).toggleClass(Ne),p(t).toggleClass(Ne).trigger(p.Event(Ae.SHOWN,n))}}}},t.show=function(){if(!(this._element.disabled||p(this._element).hasClass(Oe)||p(this._menu).hasClass(Ne))){var t={relatedTarget:this._element},e=p.Event(Ae.SHOW,t),n=c._getParentFromElement(this._element);p(n).trigger(e),e.isDefaultPrevented()||(p(this._menu).toggleClass(Ne),p(n).toggleClass(Ne).trigger(p.Event(Ae.SHOWN,t)))}},t.hide=function(){if(!this._element.disabled&&!p(this._element).hasClass(Oe)&&p(this._menu).hasClass(Ne)){var t={relatedTarget:this._element},e=p.Event(Ae.HIDE,t),n=c._getParentFromElement(this._element);p(n).trigger(e),e.isDefaultPrevented()||(p(this._menu).toggleClass(Ne),p(n).toggleClass(Ne).trigger(p.Event(Ae.HIDDEN,t)))}},t.dispose=function(){p.removeData(this._element,Ce),p(this._element).off(Te),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},t.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},t._addEventListeners=function(){var e=this;p(this._element).on(Ae.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},t._getConfig=function(t){return t=l({},this.constructor.Default,p(this._element).data(),t),m.typeCheckConfig(we,t,this.constructor.DefaultType),t},t._getMenuElement=function(){if(!this._menu){var t=c._getParentFromElement(this._element);t&&(this._menu=t.querySelector(Fe))}return this._menu},t._getPlacement=function(){var t=p(this._element.parentNode),e=qe;return t.hasClass(ke)?(e=Ue,p(this._menu).hasClass(Pe)&&(e=Be)):t.hasClass(Le)?e=Qe:t.hasClass(xe)?e=Ve:p(this._menu).hasClass(Pe)&&(e=Ke),e},t._detectNavbar=function(){return 0<p(this._element).closest(".navbar").length},t._getOffset=function(){var e=this,t={};return"function"==typeof this._config.offset?t.fn=function(t){return t.offsets=l({},t.offsets,e._config.offset(t.offsets,e._element)||{}),t}:t.offset=this._config.offset,t},t._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),t},c._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(Ce);if(t||(t=new c(this,"object"==typeof e?e:null),p(this).data(Ce,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},c._clearMenus=function(t){if(!t||3!==t.which&&("keyup"!==t.type||9===t.which))for(var e=[].slice.call(document.querySelectorAll(je)),n=0,i=e.length;n<i;n++){var o=c._getParentFromElement(e[n]),r=p(e[n]).data(Ce),s={relatedTarget:e[n]};if(t&&"click"===t.type&&(s.clickEvent=t),r){var a=r._menu;if(p(o).hasClass(Ne)&&!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&9===t.which)&&p.contains(o,t.target))){var l=p.Event(Ae.HIDE,s);p(o).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),e[n].setAttribute("aria-expanded","false"),p(a).removeClass(Ne),p(o).removeClass(Ne).trigger(p.Event(Ae.HIDDEN,s)))}}}},c._getParentFromElement=function(t){var e,n=m.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},c._dataApiKeydownHandler=function(t){if((/input|textarea/i.test(t.target.tagName)?!(32===t.which||27!==t.which&&(40!==t.which&&38!==t.which||p(t.target).closest(Fe).length)):Ie.test(t.which))&&(t.preventDefault(),t.stopPropagation(),!this.disabled&&!p(this).hasClass(Oe))){var e=c._getParentFromElement(this),n=p(e).hasClass(Ne);if(n&&(!n||27!==t.which&&32!==t.which)){var i=[].slice.call(e.querySelectorAll(We));if(0!==i.length){var o=i.indexOf(t.target);38===t.which&&0<o&&o--,40===t.which&&o<i.length-1&&o++,o<0&&(o=0),i[o].focus()}}else{if(27===t.which){var r=e.querySelector(je);p(r).trigger("focus")}p(this).trigger("click")}}},s(c,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Ye}},{key:"DefaultType",get:function(){return ze}}]),c}();p(document).on(Ae.KEYDOWN_DATA_API,je,Xe._dataApiKeydownHandler).on(Ae.KEYDOWN_DATA_API,Fe,Xe._dataApiKeydownHandler).on(Ae.CLICK_DATA_API+" "+Ae.KEYUP_DATA_API,Xe._clearMenus).on(Ae.CLICK_DATA_API,je,function(t){t.preventDefault(),t.stopPropagation(),Xe._jQueryInterface.call(p(this),"toggle")}).on(Ae.CLICK_DATA_API,Re,function(t){t.stopPropagation()}),p.fn[we]=Xe._jQueryInterface,p.fn[we].Constructor=Xe,p.fn[we].noConflict=function(){return p.fn[we]=De,Xe._jQueryInterface};var Ge="modal",$e="bs.modal",Je="."+$e,Ze=p.fn[Ge],tn={backdrop:!0,keyboard:!0,focus:!0,show:!0},en={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},nn={HIDE:"hide"+Je,HIDDEN:"hidden"+Je,SHOW:"show"+Je,SHOWN:"shown"+Je,FOCUSIN:"focusin"+Je,RESIZE:"resize"+Je,CLICK_DISMISS:"click.dismiss"+Je,KEYDOWN_DISMISS:"keydown.dismiss"+Je,MOUSEUP_DISMISS:"mouseup.dismiss"+Je,MOUSEDOWN_DISMISS:"mousedown.dismiss"+Je,CLICK_DATA_API:"click"+Je+".data-api"},on="modal-dialog-scrollable",rn="modal-scrollbar-measure",sn="modal-backdrop",an="modal-open",ln="fade",cn="show",hn=".modal-dialog",un=".modal-body",fn='[data-toggle="modal"]',dn='[data-dismiss="modal"]',pn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",mn=".sticky-top",gn=function(){function o(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(hn),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var t=o.prototype;return t.toggle=function(t){return this._isShown?this.hide():this.show(t)},t.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){p(this._element).hasClass(ln)&&(this._isTransitioning=!0);var n=p.Event(nn.SHOW,{relatedTarget:t});p(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),p(this._element).on(nn.CLICK_DISMISS,dn,function(t){return e.hide(t)}),p(this._dialog).on(nn.MOUSEDOWN_DISMISS,function(){p(e._element).one(nn.MOUSEUP_DISMISS,function(t){p(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return e._showElement(t)}))}},t.hide=function(t){var e=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=p.Event(nn.HIDE);if(p(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=p(this._element).hasClass(ln);if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),p(document).off(nn.FOCUSIN),p(this._element).removeClass(cn),p(this._element).off(nn.CLICK_DISMISS),p(this._dialog).off(nn.MOUSEDOWN_DISMISS),i){var o=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(t){return e._hideModal(t)}).emulateTransitionEnd(o)}else this._hideModal()}}},t.dispose=function(){[window,this._element,this._dialog].forEach(function(t){return p(t).off(Je)}),p(document).off(nn.FOCUSIN),p.removeData(this._element,$e),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},t.handleUpdate=function(){this._adjustDialog()},t._getConfig=function(t){return t=l({},tn,t),m.typeCheckConfig(Ge,t,en),t},t._showElement=function(t){var e=this,n=p(this._element).hasClass(ln);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),p(this._dialog).hasClass(on)?this._dialog.querySelector(un).scrollTop=0:this._element.scrollTop=0,n&&m.reflow(this._element),p(this._element).addClass(cn),this._config.focus&&this._enforceFocus();var i=p.Event(nn.SHOWN,{relatedTarget:t}),o=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,p(e._element).trigger(i)};if(n){var r=m.getTransitionDurationFromElement(this._dialog);p(this._dialog).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o()},t._enforceFocus=function(){var e=this;p(document).off(nn.FOCUSIN).on(nn.FOCUSIN,function(t){document!==t.target&&e._element!==t.target&&0===p(e._element).has(t.target).length&&e._element.focus()})},t._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?p(this._element).on(nn.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||p(this._element).off(nn.KEYDOWN_DISMISS)},t._setResizeEvent=function(){var e=this;this._isShown?p(window).on(nn.RESIZE,function(t){return e.handleUpdate(t)}):p(window).off(nn.RESIZE)},t._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop(function(){p(document.body).removeClass(an),t._resetAdjustments(),t._resetScrollbar(),p(t._element).trigger(nn.HIDDEN)})},t._removeBackdrop=function(){this._backdrop&&(p(this._backdrop).remove(),this._backdrop=null)},t._showBackdrop=function(t){var e=this,n=p(this._element).hasClass(ln)?ln:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=sn,n&&this._backdrop.classList.add(n),p(this._backdrop).appendTo(document.body),p(this._element).on(nn.CLICK_DISMISS,function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide())}),n&&m.reflow(this._backdrop),p(this._backdrop).addClass(cn),!t)return;if(!n)return void t();var i=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,t).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){p(this._backdrop).removeClass(cn);var o=function(){e._removeBackdrop(),t&&t()};if(p(this._element).hasClass(ln)){var r=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o()}else t&&t()},t._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},t._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},t._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},t._setScrollbar=function(){var o=this;if(this._isBodyOverflowing){var t=[].slice.call(document.querySelectorAll(pn)),e=[].slice.call(document.querySelectorAll(mn));p(t).each(function(t,e){var n=e.style.paddingRight,i=p(e).css("padding-right");p(e).data("padding-right",n).css("padding-right",parseFloat(i)+o._scrollbarWidth+"px")}),p(e).each(function(t,e){var n=e.style.marginRight,i=p(e).css("margin-right");p(e).data("margin-right",n).css("margin-right",parseFloat(i)-o._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=p(document.body).css("padding-right");p(document.body).data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}p(document.body).addClass(an)},t._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(pn));p(t).each(function(t,e){var n=p(e).data("padding-right");p(e).removeData("padding-right"),e.style.paddingRight=n||""});var e=[].slice.call(document.querySelectorAll(""+mn));p(e).each(function(t,e){var n=p(e).data("margin-right");"undefined"!=typeof n&&p(e).css("margin-right",n).removeData("margin-right")});var n=p(document.body).data("padding-right");p(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},t._getScrollbarWidth=function(){var t=document.createElement("div");t.className=rn,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},o._jQueryInterface=function(n,i){return this.each(function(){var t=p(this).data($e),e=l({},tn,p(this).data(),"object"==typeof n&&n?n:{});if(t||(t=new o(this,e),p(this).data($e,t)),"string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n](i)}else e.show&&t.show(i)})},s(o,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return tn}}]),o}();p(document).on(nn.CLICK_DATA_API,fn,function(t){var e,n=this,i=m.getSelectorFromElement(this);i&&(e=document.querySelector(i));var o=p(e).data($e)?"toggle":l({},p(e).data(),p(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var r=p(e).one(nn.SHOW,function(t){t.isDefaultPrevented()||r.one(nn.HIDDEN,function(){p(n).is(":visible")&&n.focus()})});gn._jQueryInterface.call(p(e),o,this)}),p.fn[Ge]=gn._jQueryInterface,p.fn[Ge].Constructor=gn,p.fn[Ge].noConflict=function(){return p.fn[Ge]=Ze,gn._jQueryInterface};var _n=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],vn={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},yn=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,En=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function bn(t,s,e){if(0===t.length)return t;if(e&&"function"==typeof e)return e(t);for(var n=(new window.DOMParser).parseFromString(t,"text/html"),a=Object.keys(s),l=[].slice.call(n.body.querySelectorAll("*")),i=function(t,e){var n=l[t],i=n.nodeName.toLowerCase();if(-1===a.indexOf(n.nodeName.toLowerCase()))return n.parentNode.removeChild(n),"continue";var o=[].slice.call(n.attributes),r=[].concat(s["*"]||[],s[i]||[]);o.forEach(function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===_n.indexOf(n)||Boolean(t.nodeValue.match(yn)||t.nodeValue.match(En));for(var i=e.filter(function(t){return t instanceof RegExp}),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,r)||n.removeAttribute(t.nodeName)})},o=0,r=l.length;o<r;o++)i(o);return n.body.innerHTML}var wn="tooltip",Cn="bs.tooltip",Tn="."+Cn,Sn=p.fn[wn],Dn="bs-tooltip",In=new RegExp("(^|\\s)"+Dn+"\\S+","g"),An=["sanitize","whiteList","sanitizeFn"],On={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object"},Nn={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},kn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:vn},Ln="show",xn="out",Pn={HIDE:"hide"+Tn,HIDDEN:"hidden"+Tn,SHOW:"show"+Tn,SHOWN:"shown"+Tn,INSERTED:"inserted"+Tn,CLICK:"click"+Tn,FOCUSIN:"focusin"+Tn,FOCUSOUT:"focusout"+Tn,MOUSEENTER:"mouseenter"+Tn,MOUSELEAVE:"mouseleave"+Tn},Hn="fade",jn="show",Rn=".tooltip-inner",Fn=".arrow",Mn="hover",Wn="focus",Un="click",Bn="manual",qn=function(){function i(t,e){if("undefined"==typeof be)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var t=i.prototype;return t.enable=function(){this._isEnabled=!0},t.disable=function(){this._isEnabled=!1},t.toggleEnabled=function(){this._isEnabled=!this._isEnabled},t.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=p(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(p(this.getTipElement()).hasClass(jn))return void this._leave(null,this);this._enter(null,this)}},t.dispose=function(){clearTimeout(this._timeout),p.removeData(this.element,this.constructor.DATA_KEY),p(this.element).off(this.constructor.EVENT_KEY),p(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&p(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},t.show=function(){var e=this;if("none"===p(this.element).css("display"))throw new Error("Please use show on visible elements");var t=p.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){p(this.element).trigger(t);var n=m.findShadowRoot(this.element),i=p.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(t.isDefaultPrevented()||!i)return;var o=this.getTipElement(),r=m.getUID(this.constructor.NAME);o.setAttribute("id",r),this.element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&p(o).addClass(Hn);var s="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,a=this._getAttachment(s);this.addAttachmentClass(a);var l=this._getContainer();p(o).data(this.constructor.DATA_KEY,this),p.contains(this.element.ownerDocument.documentElement,this.tip)||p(o).appendTo(l),p(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new be(this.element,o,{placement:a,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:Fn},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}}),p(o).addClass(jn),"ontouchstart"in document.documentElement&&p(document.body).children().on("mouseover",null,p.noop);var c=function(){e.config.animation&&e._fixTransition();var t=e._hoverState;e._hoverState=null,p(e.element).trigger(e.constructor.Event.SHOWN),t===xn&&e._leave(null,e)};if(p(this.tip).hasClass(Hn)){var h=m.getTransitionDurationFromElement(this.tip);p(this.tip).one(m.TRANSITION_END,c).emulateTransitionEnd(h)}else c()}},t.hide=function(t){var e=this,n=this.getTipElement(),i=p.Event(this.constructor.Event.HIDE),o=function(){e._hoverState!==Ln&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),p(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(p(this.element).trigger(i),!i.isDefaultPrevented()){if(p(n).removeClass(jn),"ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),this._activeTrigger[Un]=!1,this._activeTrigger[Wn]=!1,this._activeTrigger[Mn]=!1,p(this.tip).hasClass(Hn)){var r=m.getTransitionDurationFromElement(n);p(n).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o();this._hoverState=""}},t.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},t.isWithContent=function(){return Boolean(this.getTitle())},t.addAttachmentClass=function(t){p(this.getTipElement()).addClass(Dn+"-"+t)},t.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},t.setContent=function(){var t=this.getTipElement();this.setElementContent(p(t.querySelectorAll(Rn)),this.getTitle()),p(t).removeClass(Hn+" "+jn)},t.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=bn(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?p(e).parent().is(t)||t.empty().append(e):t.text(p(e).text())},t.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},t._getOffset=function(){var e=this,t={};return"function"==typeof this.config.offset?t.fn=function(t){return t.offsets=l({},t.offsets,e.config.offset(t.offsets,e.element)||{}),t}:t.offset=this.config.offset,t},t._getContainer=function(){return!1===this.config.container?document.body:m.isElement(this.config.container)?p(this.config.container):p(document).find(this.config.container)},t._getAttachment=function(t){return Nn[t.toUpperCase()]},t._setListeners=function(){var i=this;this.config.trigger.split(" ").forEach(function(t){if("click"===t)p(i.element).on(i.constructor.Event.CLICK,i.config.selector,function(t){return i.toggle(t)});else if(t!==Bn){var e=t===Mn?i.constructor.Event.MOUSEENTER:i.constructor.Event.FOCUSIN,n=t===Mn?i.constructor.Event.MOUSELEAVE:i.constructor.Event.FOCUSOUT;p(i.element).on(e,i.config.selector,function(t){return i._enter(t)}).on(n,i.config.selector,function(t){return i._leave(t)})}}),p(this.element).closest(".modal").on("hide.bs.modal",function(){i.element&&i.hide()}),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},t._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},t._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||p(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?Wn:Mn]=!0),p(e.getTipElement()).hasClass(jn)||e._hoverState===Ln?e._hoverState=Ln:(clearTimeout(e._timeout),e._hoverState=Ln,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===Ln&&e.show()},e.config.delay.show):e.show())},t._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||p(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?Wn:Mn]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=xn,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===xn&&e.hide()},e.config.delay.hide):e.hide())},t._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},t._getConfig=function(t){var e=p(this.element).data();return Object.keys(e).forEach(function(t){-1!==An.indexOf(t)&&delete e[t]}),"number"==typeof(t=l({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),m.typeCheckConfig(wn,t,this.constructor.DefaultType),t.sanitize&&(t.template=bn(t.template,t.whiteList,t.sanitizeFn)),t},t._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},t._cleanTipClass=function(){var t=p(this.getTipElement()),e=t.attr("class").match(In);null!==e&&e.length&&t.removeClass(e.join(""))},t._handlePopperPlacementChange=function(t){var e=t.instance;this.tip=e.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},t._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(p(t).removeClass(Hn),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},i._jQueryInterface=function(n){return this.each(function(){var t=p(this).data(Cn),e="object"==typeof n&&n;if((t||!/dispose|hide/.test(n))&&(t||(t=new i(this,e),p(this).data(Cn,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return kn}},{key:"NAME",get:function(){return wn}},{key:"DATA_KEY",get:function(){return Cn}},{key:"Event",get:function(){return Pn}},{key:"EVENT_KEY",get:function(){return Tn}},{key:"DefaultType",get:function(){return On}}]),i}();p.fn[wn]=qn._jQueryInterface,p.fn[wn].Constructor=qn,p.fn[wn].noConflict=function(){return p.fn[wn]=Sn,qn._jQueryInterface};var Kn="popover",Qn="bs.popover",Vn="."+Qn,Yn=p.fn[Kn],zn="bs-popover",Xn=new RegExp("(^|\\s)"+zn+"\\S+","g"),Gn=l({},qn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),$n=l({},qn.DefaultType,{content:"(string|element|function)"}),Jn="fade",Zn="show",ti=".popover-header",ei=".popover-body",ni={HIDE:"hide"+Vn,HIDDEN:"hidden"+Vn,SHOW:"show"+Vn,SHOWN:"shown"+Vn,INSERTED:"inserted"+Vn,CLICK:"click"+Vn,FOCUSIN:"focusin"+Vn,FOCUSOUT:"focusout"+Vn,MOUSEENTER:"mouseenter"+Vn,MOUSELEAVE:"mouseleave"+Vn},ii=function(t){var e,n;function i(){return t.apply(this,arguments)||this}n=t,(e=i).prototype=Object.create(n.prototype),(e.prototype.constructor=e).__proto__=n;var o=i.prototype;return o.isWithContent=function(){return this.getTitle()||this._getContent()},o.addAttachmentClass=function(t){p(this.getTipElement()).addClass(zn+"-"+t)},o.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},o.setContent=function(){var t=p(this.getTipElement());this.setElementContent(t.find(ti),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(ei),e),t.removeClass(Jn+" "+Zn)},o._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},o._cleanTipClass=function(){var t=p(this.getTipElement()),e=t.attr("class").match(Xn);null!==e&&0<e.length&&t.removeClass(e.join(""))},i._jQueryInterface=function(n){return this.each(function(){var t=p(this).data(Qn),e="object"==typeof n?n:null;if((t||!/dispose|hide/.test(n))&&(t||(t=new i(this,e),p(this).data(Qn,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Gn}},{key:"NAME",get:function(){return Kn}},{key:"DATA_KEY",get:function(){return Qn}},{key:"Event",get:function(){return ni}},{key:"EVENT_KEY",get:function(){return Vn}},{key:"DefaultType",get:function(){return $n}}]),i}(qn);p.fn[Kn]=ii._jQueryInterface,p.fn[Kn].Constructor=ii,p.fn[Kn].noConflict=function(){return p.fn[Kn]=Yn,ii._jQueryInterface};var oi="scrollspy",ri="bs.scrollspy",si="."+ri,ai=p.fn[oi],li={offset:10,method:"auto",target:""},ci={offset:"number",method:"string",target:"(string|element)"},hi={ACTIVATE:"activate"+si,SCROLL:"scroll"+si,LOAD_DATA_API:"load"+si+".data-api"},ui="dropdown-item",fi="active",di='[data-spy="scroll"]',pi=".nav, .list-group",mi=".nav-link",gi=".nav-item",_i=".list-group-item",vi=".dropdown",yi=".dropdown-item",Ei=".dropdown-toggle",bi="offset",wi="position",Ci=function(){function n(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" "+mi+","+this._config.target+" "+_i+","+this._config.target+" "+yi,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,p(this._scrollElement).on(hi.SCROLL,function(t){return n._process(t)}),this.refresh(),this._process()}var t=n.prototype;return t.refresh=function(){var e=this,t=this._scrollElement===this._scrollElement.window?bi:wi,o="auto"===this._config.method?t:this._config.method,r=o===wi?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(t){var e,n=m.getSelectorFromElement(t);if(n&&(e=document.querySelector(n)),e){var i=e.getBoundingClientRect();if(i.width||i.height)return[p(e)[o]().top+r,n]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},t.dispose=function(){p.removeData(this._element,ri),p(this._scrollElement).off(si),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},t._getConfig=function(t){if("string"!=typeof(t=l({},li,"object"==typeof t&&t?t:{})).target){var e=p(t.target).attr("id");e||(e=m.getUID(oi),p(t.target).attr("id",e)),t.target="#"+e}return m.typeCheckConfig(oi,t,ci),t},t._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},t._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},t._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},t._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),n<=t){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},t._activate=function(e){this._activeTarget=e,this._clear();var t=this._selector.split(",").map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'}),n=p([].slice.call(document.querySelectorAll(t.join(","))));n.hasClass(ui)?(n.closest(vi).find(Ei).addClass(fi),n.addClass(fi)):(n.addClass(fi),n.parents(pi).prev(mi+", "+_i).addClass(fi),n.parents(pi).prev(gi).children(mi).addClass(fi)),p(this._scrollElement).trigger(hi.ACTIVATE,{relatedTarget:e})},t._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter(function(t){return t.classList.contains(fi)}).forEach(function(t){return t.classList.remove(fi)})},n._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(ri);if(t||(t=new n(this,"object"==typeof e&&e),p(this).data(ri,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return li}}]),n}();p(window).on(hi.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(di)),e=t.length;e--;){var n=p(t[e]);Ci._jQueryInterface.call(n,n.data())}}),p.fn[oi]=Ci._jQueryInterface,p.fn[oi].Constructor=Ci,p.fn[oi].noConflict=function(){return p.fn[oi]=ai,Ci._jQueryInterface};var Ti="bs.tab",Si="."+Ti,Di=p.fn.tab,Ii={HIDE:"hide"+Si,HIDDEN:"hidden"+Si,SHOW:"show"+Si,SHOWN:"shown"+Si,CLICK_DATA_API:"click"+Si+".data-api"},Ai="dropdown-menu",Oi="active",Ni="disabled",ki="fade",Li="show",xi=".dropdown",Pi=".nav, .list-group",Hi=".active",ji="> li > .active",Ri='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',Fi=".dropdown-toggle",Mi="> .dropdown-menu .active",Wi=function(){function i(t){this._element=t}var t=i.prototype;return t.show=function(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&p(this._element).hasClass(Oi)||p(this._element).hasClass(Ni))){var t,i,e=p(this._element).closest(Pi)[0],o=m.getSelectorFromElement(this._element);if(e){var r="UL"===e.nodeName||"OL"===e.nodeName?ji:Hi;i=(i=p.makeArray(p(e).find(r)))[i.length-1]}var s=p.Event(Ii.HIDE,{relatedTarget:this._element}),a=p.Event(Ii.SHOW,{relatedTarget:i});if(i&&p(i).trigger(s),p(this._element).trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){o&&(t=document.querySelector(o)),this._activate(this._element,e);var l=function(){var t=p.Event(Ii.HIDDEN,{relatedTarget:n._element}),e=p.Event(Ii.SHOWN,{relatedTarget:i});p(i).trigger(t),p(n._element).trigger(e)};t?this._activate(t,t.parentNode,l):l()}}},t.dispose=function(){p.removeData(this._element,Ti),this._element=null},t._activate=function(t,e,n){var i=this,o=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?p(e).children(Hi):p(e).find(ji))[0],r=n&&o&&p(o).hasClass(ki),s=function(){return i._transitionComplete(t,o,n)};if(o&&r){var a=m.getTransitionDurationFromElement(o);p(o).removeClass(Li).one(m.TRANSITION_END,s).emulateTransitionEnd(a)}else s()},t._transitionComplete=function(t,e,n){if(e){p(e).removeClass(Oi);var i=p(e.parentNode).find(Mi)[0];i&&p(i).removeClass(Oi),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(p(t).addClass(Oi),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),m.reflow(t),t.classList.contains(ki)&&t.classList.add(Li),t.parentNode&&p(t.parentNode).hasClass(Ai)){var o=p(t).closest(xi)[0];if(o){var r=[].slice.call(o.querySelectorAll(Fi));p(r).addClass(Oi)}t.setAttribute("aria-expanded",!0)}n&&n()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(Ti);if(e||(e=new i(this),t.data(Ti,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),i}();p(document).on(Ii.CLICK_DATA_API,Ri,function(t){t.preventDefault(),Wi._jQueryInterface.call(p(this),"show")}),p.fn.tab=Wi._jQueryInterface,p.fn.tab.Constructor=Wi,p.fn.tab.noConflict=function(){return p.fn.tab=Di,Wi._jQueryInterface};var Ui="toast",Bi="bs.toast",qi="."+Bi,Ki=p.fn[Ui],Qi={CLICK_DISMISS:"click.dismiss"+qi,HIDE:"hide"+qi,HIDDEN:"hidden"+qi,SHOW:"show"+qi,SHOWN:"shown"+qi},Vi="fade",Yi="hide",zi="show",Xi="showing",Gi={animation:"boolean",autohide:"boolean",delay:"number"},$i={animation:!0,autohide:!0,delay:500},Ji='[data-dismiss="toast"]',Zi=function(){function i(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var t=i.prototype;return t.show=function(){var t=this;p(this._element).trigger(Qi.SHOW),this._config.animation&&this._element.classList.add(Vi);var e=function(){t._element.classList.remove(Xi),t._element.classList.add(zi),p(t._element).trigger(Qi.SHOWN),t._config.autohide&&t.hide()};if(this._element.classList.remove(Yi),this._element.classList.add(Xi),this._config.animation){var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},t.hide=function(t){var e=this;this._element.classList.contains(zi)&&(p(this._element).trigger(Qi.HIDE),t?this._close():this._timeout=setTimeout(function(){e._close()},this._config.delay))},t.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(zi)&&this._element.classList.remove(zi),p(this._element).off(Qi.CLICK_DISMISS),p.removeData(this._element,Bi),this._element=null,this._config=null},t._getConfig=function(t){return t=l({},$i,p(this._element).data(),"object"==typeof t&&t?t:{}),m.typeCheckConfig(Ui,t,this.constructor.DefaultType),t},t._setListeners=function(){var t=this;p(this._element).on(Qi.CLICK_DISMISS,Ji,function(){return t.hide(!0)})},t._close=function(){var t=this,e=function(){t._element.classList.add(Yi),p(t._element).trigger(Qi.HIDDEN)};if(this._element.classList.remove(zi),this._config.animation){var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(Bi);if(e||(e=new i(this,"object"==typeof n&&n),t.data(Bi,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n](this)}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"DefaultType",get:function(){return Gi}},{key:"Default",get:function(){return $i}}]),i}();p.fn[Ui]=Zi._jQueryInterface,p.fn[Ui].Constructor=Zi,p.fn[Ui].noConflict=function(){return p.fn[Ui]=Ki,Zi._jQueryInterface},function(){if("undefined"==typeof p)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=p.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||4<=t[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),t.Util=m,t.Alert=g,t.Button=k,t.Carousel=at,t.Collapse=Ct,t.Dropdown=Xe,t.Modal=gn,t.Popover=ii,t.Scrollspy=Ci,t.Tab=Wi,t.Toast=Zi,t.Tooltip=qn,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=bootstrap.bundle.min.js.map
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Amplitude",[],t):"object"==typeof exports?exports.Amplitude=t():e.Amplitude=t()}(this,function(){return function(e){function t(l){if(a[l])return a[l].exports;var u=a[l]={i:l,l:!1,exports:{}};return e[l].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var a={};return t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,l){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=47)}([function(e,t,a){"use strict";var l=a(59);e.exports={version:l.version,audio:new Audio,active_metadata:{},active_album:"",active_index:0,active_playlist:null,playback_speed:1,callbacks:{},songs:[],playlists:{},start_song:"",starting_playlist:"",starting_playlist_song:"",repeat:!1,repeat_song:!1,shuffle_list:{},shuffle_on:!1,default_album_art:"",default_playlist_art:"",debug:!1,volume:.5,pre_mute_volume:.5,volume_increment:5,volume_decrement:5,soundcloud_client:"",soundcloud_use_art:!1,soundcloud_song_count:0,soundcloud_songs_ready:0,is_touch_moving:!1,buffered:0,bindings:{},continue_next:!0,delay:0,player_state:"stopped",web_audio_api_available:!1,context:null,source:null,analyser:null,visualizations:{available:[],active:[],backup:""},waveforms:{sample_rate:100,built:[]}}},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(5),d=(l(i),a(3)),s=(l(d),a(2)),o=(l(s),a(8)),r=(l(o),a(7)),f=l(r),c=a(4),p=l(c),v=a(16),y=l(v),g=function(){function e(){y.default.stop(),y.default.run(),n.default.active_metadata.live&&s(),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&!n.default.paused&&s(),n.default.audio.play(),n.default.audio.playbackRate=n.default.playback_speed}function t(){y.default.stop(),n.default.audio.pause(),n.default.paused=!0,n.default.active_metadata.live&&d()}function a(){y.default.stop(),0!=n.default.audio.currentTime&&(n.default.audio.currentTime=0),n.default.audio.pause(),n.default.active_metadata.live&&d(),f.default.run("stop")}function l(e){n.default.audio.muted=0==e,n.default.volume=e,n.default.audio.volume=e/100}function u(e){n.default.active_metadata.live||(n.default.audio.currentTime=n.default.audio.duration*(e/100))}function i(e){n.default.audio.addEventListener("canplaythrough",function(){n.default.audio.duration>=e&&e>0?n.default.audio.currentTime=e:p.default.writeMessage("Amplitude can't skip to a location greater than the duration of the audio or less than 0")},{once:!0})}function d(){n.default.audio.src="",n.default.audio.load()}function s(){n.default.audio.src=n.default.active_metadata.url,n.default.audio.load()}function o(e){n.default.playback_speed=e,n.default.audio.playbackRate=n.default.playback_speed}return{play:e,pause:t,stop:a,setVolume:l,setSongLocation:u,skipToLocation:i,disconnectStream:d,reconnectStream:s,setPlaybackSpeed:o}}();t.default=g,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){t(),a(),l(),n()}function t(){for(var e=u.default.audio.paused?"paused":"playing",t=document.querySelectorAll(".amplitude-play-pause"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),n=t[a].getAttribute("data-amplitude-song-index");if(null==l&&null==n)switch(e){case"playing":d(t[a]);break;case"paused":s(t[a])}}}function a(){for(var e=u.default.audio.paused?"paused":"playing",t=document.querySelectorAll('.amplitude-play-pause[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){if(null==t[a].getAttribute("data-amplitude-song-index"))switch(e){case"playing":d(t[a]);break;case"paused":s(t[a])}}}function l(){for(var e=u.default.audio.paused?"paused":"playing",t=document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){if(null==t[a].getAttribute("data-amplitude-playlist"))switch(e){case"playing":d(t[a]);break;case"paused":s(t[a])}}}function n(){for(var e=u.default.audio.paused?"paused":"playing",t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="'+t+'"][data-amplitude-playlist="'+u.default.active_playlist+'"]'),l=0;l<a.length;l++)switch(e){case"playing":d(a[l]);break;case"paused":s(a[l])}}function i(){for(var e=document.querySelectorAll(".amplitude-play-pause"),t=0;t<e.length;t++)s(e[t])}function d(e){e.classList.add("amplitude-playing"),e.classList.remove("amplitude-paused")}function s(e){e.classList.remove("amplitude-playing"),e.classList.add("amplitude-paused")}return{sync:e,syncGlobal:t,syncPlaylist:a,syncSong:l,syncSongInPlaylist:n,syncToPause:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(7),o=l(s),r=a(5),f=l(r),c=a(2),p=l(c),v=a(14),y=l(v),g=a(19),m=l(g),_=a(15),h=l(_),b=a(8),A=l(b),x=a(49),M=l(x),P=function(){function e(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=null,a={},l=!1;n.default.repeat_song?n.default.shuffle_on?(t=n.default.active_index,a=n.default.shuffle_list[t]):(t=n.default.active_index,a=n.default.songs[t]):n.default.shuffle_on?(parseInt(n.default.active_index)+1<n.default.shuffle_list.length?t=parseInt(n.default.active_index)+1:(t=0,l=!0),a=n.default.shuffle_list[t]):(parseInt(n.default.active_index)+1<n.default.songs.length?t=parseInt(n.default.active_index)+1:(t=0,l=!0),a=n.default.songs[t]),u(a,t),l&&!n.default.repeat||e&&!n.default.repeat&&l||d.default.play(),p.default.sync(),o.default.run("next"),n.default.repeat_song&&o.default.run("song_repeated")}function t(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=null,l={},u=!1;n.default.repeat_song?n.default.playlists[e].shuffle?(a=n.default.playlists[e].active_index,l=n.default.playlists[e].shuffle_list[a]):(a=n.default.playlists[e].active_index,l=n.default.playlists[e].songs[a]):n.default.playlists[e].shuffle?(parseInt(n.default.playlists[e].active_index)+1<n.default.playlists[e].shuffle_list.length?a=n.default.playlists[e].active_index+1:(a=0,u=!0),l=n.default.playlists[e].shuffle_list[a]):(parseInt(n.default.playlists[e].active_index)+1<n.default.playlists[e].songs.length?a=parseInt(n.default.playlists[e].active_index)+1:(a=0,u=!0),l=n.default.playlists[e].songs[a]),c(e),i(e,l,a),u&&!n.default.repeat||t&&!n.default.repeat&&u||d.default.play(),p.default.sync(),o.default.run("next"),n.default.repeat_song&&o.default.run("song_repeated")}function a(){var e=null,t={};n.default.repeat_song?n.default.shuffle_on?(e=n.default.active_index,t=n.default.shuffle_list[e]):(e=n.default.active_index,t=n.default.songs[e]):(e=parseInt(n.default.active_index)-1>=0?parseInt(n.default.active_index-1):parseInt(n.default.songs.length-1),t=n.default.shuffle_on?n.default.shuffle_list[e]:n.default.songs[e]),u(t,e),d.default.play(),p.default.sync(),o.default.run("prev"),n.default.repeat_song&&o.default.run("song_repeated")}function l(e){var t=null,a={};n.default.repeat_song?n.default.playlists[e].shuffle?(t=n.default.playlists[e].active_index,a=n.default.playlists[e].shuffle_list[t]):(t=n.default.playlists[e].active_index,a=n.default.playlists[e].songs[t]):(t=parseInt(n.default.playlists[e].active_index)-1>=0?parseInt(n.default.playlists[e].active_index-1):parseInt(n.default.playlists[e].songs.length-1),a=n.default.playlists[e].shuffle?n.default.playlists[e].shuffle_list[t]:n.default.playlists[e].songs[t]),c(e),i(e,a,t),d.default.play(),p.default.sync(),o.default.run("prev"),n.default.repeat_song&&o.default.run("song_repeated")}function u(e,t){s(e),n.default.audio.src=e.url,n.default.active_metadata=e,n.default.active_album=e.album,n.default.active_index=parseInt(t),r()}function i(e,t,a){s(t),n.default.audio.src=t.url,n.default.active_metadata=t,n.default.active_album=t.album,n.default.active_index=null,n.default.playlists[e].active_index=parseInt(a),r()}function s(e){d.default.stop(),p.default.syncToPause(),y.default.resetElements(),m.default.resetElements(),h.default.resetCurrentTimes(),f.default.newAlbum(e)&&o.default.run("album_change")}function r(){A.default.displayMetaData(),M.default.setActive(),h.default.resetDurationTimes(),o.default.run("song_change")}function c(e){n.default.active_playlist!=e&&(o.default.run("playlist_changed"),n.default.active_playlist=e,null!=e&&(n.default.playlists[e].active_index=0))}return{setNext:e,setNextPlaylist:t,setPrevious:a,setPreviousPlaylist:l,changeSong:u,changeSongPlaylist:i,setActivePlaylist:c}}();t.default=P,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){u.default.debug&&console.log(e)}return{writeMessage:e}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e,t){return u.default.active_playlist!=e||(null==u.default.active_playlist&&null==e?u.default.active_index!=t:u.default.active_playlist==e&&u.default.playlists[e].active_index!=t)}function t(e){return u.default.active_album!=e}function a(e){return u.default.active_playlist!=e}function l(e){return/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(e)}function n(e){return!isNaN(e)&&parseInt(Number(e))==e&&!isNaN(parseInt(e,10))}return{newSong:e,newAlbum:t,newPlaylist:a,isURL:l,isInt:n}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){u.default.audio=new Audio,u.default.active_metadata={},u.default.active_album="",u.default.active_index=0,u.default.active_playlist=null,u.default.playback_speed=1,u.default.callbacks={},u.default.songs=[],u.default.playlists={},u.default.start_song="",u.default.starting_playlist="",u.default.starting_playlist_song="",u.default.repeat=!1,u.default.shuffle_list={},u.default.shuffle_on=!1,u.default.default_album_art="",u.default.default_playlist_art="",u.default.debug=!1,u.default.volume=.5,u.default.pre_mute_volume=.5,u.default.volume_increment=5,u.default.volume_decrement=5,u.default.soundcloud_client="",u.default.soundcloud_use_art=!1,u.default.soundcloud_song_count=0,u.default.soundcloud_songs_ready=0,u.default.continue_next=!0}function t(){u.default.audio.paused&&0==u.default.audio.currentTime&&(u.default.player_state="stopped"),u.default.audio.paused&&u.default.audio.currentTime>0&&(u.default.player_state="paused"),u.default.audio.paused||(u.default.player_state="playing")}return{resetConfig:e,setPlayerState:t}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(4),d=l(i),s=function(){function e(){n.default.audio.addEventListener("abort",function(){t("abort")}),n.default.audio.addEventListener("error",function(){t("error")}),n.default.audio.addEventListener("loadeddata",function(){t("loadeddata")}),n.default.audio.addEventListener("loadedmetadata",function(){t("loadedmetadata")}),n.default.audio.addEventListener("loadstart",function(){t("loadstart")}),n.default.audio.addEventListener("pause",function(){t("pause")}),n.default.audio.addEventListener("playing",function(){t("playing")}),n.default.audio.addEventListener("play",function(){t("play")}),n.default.audio.addEventListener("progress",function(){t("progress")}),n.default.audio.addEventListener("ratechange",function(){t("ratechange")}),n.default.audio.addEventListener("seeked",function(){t("seeked")}),n.default.audio.addEventListener("seeking",function(){t("seeking")}),n.default.audio.addEventListener("stalled",function(){t("stalled")}),n.default.audio.addEventListener("suspend",function(){t("suspend")}),n.default.audio.addEventListener("timeupdate",function(){t("timeupdate")}),n.default.audio.addEventListener("volumechange",function(){t("volumechange")}),n.default.audio.addEventListener("waiting",function(){t("waiting")}),n.default.audio.addEventListener("canplay",function(){t("canplay")}),n.default.audio.addEventListener("canplaythrough",function(){t("canplaythrough")}),n.default.audio.addEventListener("durationchange",function(){t("durationchange")}),n.default.audio.addEventListener("ended",function(){t("ended")})}function t(e){if(n.default.callbacks[e]){var t=n.default.callbacks[e];d.default.writeMessage("Running Callback: "+e);try{t()}catch(e){if("CANCEL EVENT"==e.message)throw e;d.default.writeMessage("Callback error: "+e.message)}}}return{initialize:e,run:t}}();t.default=s,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=["cover_art_url","station_art_url","podcast_episode_cover_art_url"],t=document.querySelectorAll("[data-amplitude-song-info]"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-song-info"),n=t[a].getAttribute("data-amplitude-playlist"),i=t[a].getAttribute("data-amplitude-song-index");null==i&&(u.default.active_playlist==n||null==n&&null==i)&&(void 0!=u.default.active_metadata[l]?e.indexOf(l)>=0?t[a].setAttribute("src",u.default.active_metadata[l]):t[a].innerHTML=u.default.active_metadata[l]:e.indexOf(l)>=0?""!=u.default.default_album_art?t[a].setAttribute("src",u.default.default_album_art):t[a].setAttribute("src",""):t[a].innerHTML="")}}function t(){for(var e=["image_url"],t=document.querySelectorAll("[data-amplitude-playlist-info]"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist-info"),n=t[a].getAttribute("data-amplitude-playlist");void 0!=u.default.playlists[n][l]?e.indexOf(l)>=0?t[a].setAttribute("src",u.default.playlists[n][l]):t[a].innerHTML=u.default.playlists[n][l]:e.indexOf(l)>=0?""!=u.default.default_playlist_art?t[a].setAttribute("src",u.default.default_playlist_art):t[a].setAttribute("src",""):t[a].innerHTML=""}}function a(e,t){for(var a=["cover_art_url","station_art_url","podcast_episode_cover_art_url"],l=document.querySelectorAll('[data-amplitude-song-info][data-amplitude-playlist="'+t+'"]'),u=0;u<l.length;u++){var n=l[u].getAttribute("data-amplitude-song-info");l[u].getAttribute("data-amplitude-playlist")==t&&(void 0!=e[n]?a.indexOf(n)>=0?l[u].setAttribute("src",e[n]):l[u].innerHTML=e[n]:a.indexOf(n)>=0?""!=e.default_album_art?l[u].setAttribute("src",e.default_album_art):l[u].setAttribute("src",""):l[u].innerHTML="")}}function l(){for(var e=["cover_art_url","station_art_url","podcast_episode_cover_art_url"],a=document.querySelectorAll("[data-amplitude-song-info]"),l=0;l<a.length;l++){var n=a[l].getAttribute("data-amplitude-song-index"),i=a[l].getAttribute("data-amplitude-playlist");if(null!=n&&null==i){var d=a[l].getAttribute("data-amplitude-song-info");void 0!=u.default.songs[n][d]&&(e.indexOf(d)>=0?a[l].setAttribute("src",u.default.songs[n][d]):a[l].innerHTML=u.default.songs[n][d])}if(null!=n&&null!=i){var s=a[l].getAttribute("data-amplitude-song-info");void 0!=u.default.playlists[i].songs[n][s]&&(e.indexOf(s)>=0?a[l].setAttribute("src",u.default.playlists[i].songs[n][s]):a[l].innerHTML=u.default.playlists[i].songs[n][s])}}t()}return{displayMetaData:e,setFirstSongInPlaylist:a,syncMetaData:l,displayPlaylistMetaData:t}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=document.getElementsByClassName("amplitude-repeat"),t=0;t<e.length;t++)u.default.repeat?(e[t].classList.add("amplitude-repeat-on"),e[t].classList.remove("amplitude-repeat-off")):(e[t].classList.remove("amplitude-repeat-on"),e[t].classList.add("amplitude-repeat-off"))}function t(e){for(var t=document.getElementsByClassName("amplitude-repeat"),a=0;a<t.length;a++)t[a].getAttribute("data-amplitude-playlist")==e&&(u.default.playlists[e].repeat?(t[a].classList.add("amplitude-repeat-on"),t[a].classList.remove("amplitude-repeat-off")):(t[a].classList.add("amplitude-repeat-off"),t[a].classList.remove("amplitude-repeat-on")))}function a(){for(var e=document.getElementsByClassName("amplitude-repeat-song"),t=0;t<e.length;t++)u.default.repeat_song?(e[t].classList.add("amplitude-repeat-song-on"),e[t].classList.remove("amplitude-repeat-song-off")):(e[t].classList.remove("amplitude-repeat-song-on"),e[t].classList.add("amplitude-repeat-song-off"))}return{syncRepeat:e,syncRepeatPlaylist:t,syncRepeatSong:a}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e){for(var t=document.getElementsByClassName("amplitude-mute"),a=0;a<t.length;a++)e?(t[a].classList.remove("amplitude-not-muted"),t[a].classList.add("amplitude-muted")):(t[a].classList.add("amplitude-not-muted"),t[a].classList.remove("amplitude-muted"))}return{setMuted:e}}();t.default=l,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=document.getElementsByClassName("amplitude-volume-slider"),t=0;t<e.length;t++)e[t].value=100*u.default.audio.volume}return{sync:e}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){u.default.repeat=e}function t(e,t){u.default.playlists[t].repeat=e}function a(e){u.default.repeat_song=e}return{setRepeat:e,setRepeatPlaylist:t,setRepeatSong:a}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){u.default.shuffle_on=e,e?n():u.default.shuffle_list=[]}function t(){u.default.shuffle_on?(u.default.shuffle_on=!1,u.default.shuffle_list=[]):(u.default.shuffle_on=!0,n())}function a(e,t){u.default.playlists[e].shuffle=t,u.default.playlists[e].shuffle?i(e):u.default.playlists[e].shuffle_list=[]}function l(e){u.default.playlists[e].shuffle?(u.default.playlists[e].shuffle=!1,u.default.playlists[e].shuffle_list=[]):(u.default.playlists[e].shuffle=!0,i(e))}function n(){for(var e=new Array(u.default.songs.length),t=0;t<u.default.songs.length;t++)e[t]=u.default.songs[t];for(var a=u.default.songs.length-1;a>0;a--){d(e,a,Math.floor(Math.random()*u.default.songs.length+1)-1)}u.default.shuffle_list=e}function i(e){for(var t=new Array(u.default.playlists[e].songs.length),a=0;a<u.default.playlists[e].songs.length;a++)t[a]=u.default.playlists[e].songs[a];for(var l=u.default.playlists[e].songs.length-1;l>0;l--){d(t,l,Math.floor(Math.random()*u.default.playlists[e].songs.length+1)-1)}u.default.playlists[e].shuffle_list=t}function d(e,t,a){var l=e[t];e[t]=e[a],e[a]=l}return{setShuffle:e,toggleShuffle:t,setShufflePlaylist:a,toggleShufflePlaylist:l,shuffleSongs:n,shufflePlaylistSongs:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e,u,i){t(e),a(e,u),l(e,i),n(e,u)}function t(e){e=isNaN(e)?0:e;for(var t=document.querySelectorAll(".amplitude-song-slider"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].value=e)}}function a(e,t){e=isNaN(e)?0:e;for(var a=document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="'+t+'"]'),l=0;l<a.length;l++){var u=a[l].getAttribute("data-amplitude-playlist"),n=a[l].getAttribute("data-amplitude-song-index");u==t&&null==n&&(a[l].value=e)}}function l(e,t){if(null==u.default.active_playlist){e=isNaN(e)?0:e;for(var a=document.querySelectorAll('.amplitude-song-slider[data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++){var n=a[l].getAttribute("data-amplitude-playlist"),i=a[l].getAttribute("data-amplitude-song-index");null==n&&i==t&&(a[l].value=e)}}}function n(e,t){e=isNaN(e)?0:e;for(var a=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,l=document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="'+t+'"][data-amplitude-song-index="'+a+'"]'),n=0;n<l.length;n++)l[n].value=e}function i(){for(var e=document.getElementsByClassName("amplitude-song-slider"),t=0;t<e.length;t++)e[t].value=0}return{sync:e,syncMain:t,syncPlaylist:a,syncSong:l,syncSongInPlaylist:n,resetElements:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(53),n=l(u),i=a(50),d=l(i),s=a(51),o=l(s),r=a(52),f=l(r),c=a(54),p=l(c),v=a(55),y=l(v),g=a(56),m=l(g),_=a(57),h=l(_),b=a(58),A=l(b),x=function(){function e(){n.default.resetTimes(),d.default.resetTimes(),o.default.resetTimes(),f.default.resetTimes()}function t(e){n.default.sync(e),d.default.sync(e.hours),o.default.sync(e.minutes),f.default.sync(e.seconds)}function a(){p.default.resetTimes(),y.default.resetTimes(),m.default.resetTimes(),h.default.resetTimes(),A.default.resetTimes()}function l(e,t){p.default.sync(e,t),A.default.sync(t),y.default.sync(t.hours),m.default.sync(t.minutes),h.default.sync(t.seconds)}return{resetCurrentTimes:e,syncCurrentTimes:t,resetDurationTimes:a,syncDurationTimes:l}}();t.default=x,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(4),d=(l(i),function(){function e(){var e=document.querySelectorAll(".amplitude-visualization");if(n.default.web_audio_api_available){if(Object.keys(n.default.visualizations.available).length>0&&e.length>0)for(var i=0;i<e.length;i++){var d=e[i].getAttribute("data-amplitude-playlist"),s=e[i].getAttribute("data-amplitude-song-index");null==d&&null==s&&t(e[i]),null!=d&&null==s&&a(e[i],d),null==d&&null!=s&&l(e[i],s),null!=d&&null!=s&&u(e[i],d,s)}}else o()}function t(e){var t=n.default.visualization,a=null!=n.default.active_index?n.default.songs[n.default.active_index].visualization:n.default.playlists[n.default.active_playlist].songs[n.default.playlists[n.default.active_playlist].active_index].visualization;if(void 0!=a&&void 0!=n.default.visualizations.available[a])i(a,e);else if(void 0!=t&&void 0!=n.default.visualizations.available[t])i(t,e);else{var l=Object.keys(n.default.visualizations.available).length>0?Object.keys(n.default.visualizations.available)[0]:null;null!=l&&i(l,e)}}function a(e,t){if(t==n.default.active_playlist){var a=n.default.playlists[n.default.active_playlist].songs[n.default.playlists[n.default.active_playlist].active_index].visualization,l=n.default.playlists[n.default.active_playlist].visualization,u=n.default.visualization;if(void 0!=a&&void 0!=n.default.visualizations.available[a])i(a,e);else if(void 0!=l&&void 0!=n.default.visualizations.available[l])i(l,e);else if(void 0!=u&&void 0!=n.default.visualizations.available[u])i(u,e);else{var d=Object.keys(n.default.visualizations.available).length>0?Object.keys(n.default.visualizations.available)[0]:null;null!=d&&i(d,e)}}}function l(e,t){if(t==n.default.active_index){var a=n.default.songs[n.default.active_index].visualization,l=n.default.visualization;if(void 0!=a&&void 0!=n.default.visualizations.available[a])i(a,e);else if(void 0!=l&&void 0!=n.default.visualizations.available[l])i(l,e);else{var u=Object.keys(n.default.visualizations.available).length>0?Object.keys(n.default.visualizations.available)[0]:null;null!=u&&i(u,e)}}}function u(e,t,a){if(t==n.default.active_playlist&&n.default.playlists[t].active_index==a){var l=n.default.playlists[n.default.active_playlist].songs[n.default.playlists[n.default.active_playlist].active_index].visualization,u=n.default.playlists[n.default.active_playlist].visualization,d=n.default.visualization;if(void 0!=l&&void 0!=n.default.visualizations.available[l])i(l,e);else if(void 0!=u&&void 0!=n.default.visualizations.available[u])i(u,e);else if(void 0!=d&&void 0!=n.default.visualizations.available[d])i(d,e);else{var s=Object.keys(n.default.visualizations.available).length>0?Object.keys(n.default.visualizations.available)[0]:null;null!=s&&i(s,e)}}}function i(e,t){var a=new n.default.visualizations.available[e].object;a.setPreferences(n.default.visualizations.available[e].preferences),a.startVisualization(t),n.default.visualizations.active.push(a)}function d(){for(var e=0;e<n.default.visualizations.active.length;e++)n.default.visualizations.active[e].stopVisualization();n.default.visualizations.active=[]}function s(e,t){var a=new e;n.default.visualizations.available[a.getID()]=new Array,n.default.visualizations.available[a.getID()].object=e,n.default.visualizations.available[a.getID()].preferences=t}function o(){var e=document.querySelectorAll(".amplitude-visualization");if(e.length>0)for(var t=0;t<e.length;t++){var a=e[t].getAttribute("data-amplitude-playlist"),l=e[t].getAttribute("data-amplitude-song-index");null==a&&null==l&&r(e[t]),null!=a&&null==l&&f(e[t],a),null==a&&null!=l&&c(e[t],l),null!=a&&null!=l&&p(e[t],a,l)}}function r(e){e.style.backgroundImage="url("+n.default.active_metadata.cover_art_url+")"}function f(e,t){n.default.active_playlist==t&&(e.style.backgroundImage="url("+n.default.active_metadata.cover_art_url+")")}function c(e,t){n.default.active_index==t&&(e.style.backgroundImage="url("+n.default.active_metadata.cover_art_url+")")}function p(e,t,a){n.default.active_playlist==t&&n.default.playlists[active_playlist].active_index==a&&(e.style.backgroundImage="url("+n.default.active_metadata.cover_art_url+")")}return{run:e,stop:d,register:s}}());t.default=d,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(20),d=l(i),s=function(){function e(e){s=e;var a=document.getElementsByTagName("head")[0],l=document.createElement("script");l.type="text/javascript",l.src="https://connect.soundcloud.com/sdk.js",l.onreadystatechange=t,l.onload=t,a.appendChild(l)}function t(){SC.initialize({client_id:n.default.soundcloud_client}),a()}function a(){for(var e=/^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/,t=0;t<n.default.songs.length;t++)n.default.songs[t].url.match(e)&&(n.default.soundcloud_song_count++,u(n.default.songs[t].url,t))}function l(e,t,a){var l=arguments.length>3&&void 0!==arguments[3]&&arguments[3];SC.get("/resolve/?url="+e,function(e){e.streamable?null!=t?(n.default.playlists[t].songs[a].url=e.stream_url+"?client_id="+n.default.soundcloud_client,l&&(n.default.playlists[t].shuffle_list[a].url=e.stream_url+"?client_id="+n.default.soundcloud_client),n.default.soundcloud_use_art&&(n.default.playlists[t].songs[a].cover_art_url=e.artwork_url,l&&(n.default.playlists[t].shuffle_list[a].cover_art_url=e.artwork_url)),n.default.playlists[t].songs[a].soundcloud_data=e,l&&(n.default.playlists[t].shuffle_list[a].soundcloud_data=e)):(n.default.songs[a].url=e.stream_url+"?client_id="+n.default.soundcloud_client,l&&(n.default.shuffle_list[a].stream_url,n.default.soundcloud_client),n.default.soundcloud_use_art&&(n.default.songs[a].cover_art_url=e.artwork_url,l&&(n.default.shuffle_list[a].cover_art_url=e.artwork_url)),n.default.songs[a].soundcloud_data=e,l&&(n.default.shuffle_list[a].soundcloud_data=e)):null!=t?AmplitudeHelpers.writeDebugMessage(n.default.playlists[t].songs[a].name+" by "+n.default.playlists[t].songs[a].artist+" is not streamable by the Soundcloud API"):AmplitudeHelpers.writeDebugMessage(n.default.songs[a].name+" by "+n.default.songs[a].artist+" is not streamable by the Soundcloud API")})}function u(e,t){SC.get("/resolve/?url="+e,function(e){e.streamable?(n.default.songs[t].url=e.stream_url+"?client_id="+n.default.soundcloud_client,n.default.soundcloud_use_art&&(n.default.songs[t].cover_art_url=e.artwork_url),n.default.songs[t].soundcloud_data=e):AmplitudeHelpers.writeDebugMessage(n.default.songs[t].name+" by "+n.default.songs[t].artist+" is not streamable by the Soundcloud API"),++n.default.soundcloud_songs_ready==n.default.soundcloud_song_count&&d.default.setConfig(s)})}function i(e){var t=/^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;return e.match(t)}var s={};return{loadSoundCloud:e,resolveIndividualStreamableURL:l,isSoundCloudURL:i}}();t.default=s,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=document.getElementsByClassName("amplitude-shuffle"),t=0;t<e.length;t++)null==e[t].getAttribute("data-amplitude-playlist")&&(u.default.shuffle_on?(e[t].classList.add("amplitude-shuffle-on"),e[t].classList.remove("amplitude-shuffle-off")):(e[t].classList.add("amplitude-shuffle-off"),e[t].classList.remove("amplitude-shuffle-on")))}function t(e){for(var t=document.querySelectorAll('.amplitude-shuffle[data-amplitude-playlist="'+e+'"]'),a=0;a<t.length;a++)u.default.playlists[e].shuffle?(t[a].classList.add("amplitude-shuffle-on"),t[a].classList.remove("amplitude-shuffle-off")):(t[a].classList.add("amplitude-shuffle-off"),t[a].classList.remove("amplitude-shuffle-on"))}return{syncMain:e,syncPlaylist:t}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){if(!isNaN(e))for(var t=document.querySelectorAll(".amplitude-song-played-progress"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");if(null==l&&null==u){var n=t[a].max;t[a].value=e/100*n}}}function a(e){if(!isNaN(e))for(var t=document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-song-index");if(null==l){var n=t[a].max;t[a].value=e/100*n}}}function l(e){if(null==u.default.active_playlist&&!isNaN(e))for(var t=document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");if(null==l){var n=t[a].max;t[a].value=e/100*n}}}function n(e){if(!isNaN(e))for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++){var n=a[l].getAttribute("data-amplitude-playlist"),i=a[l].getAttribute("data-amplitude-song-index");if(null!=n&&null!=i){var d=a[l].max;a[l].value=e/100*d}}}function i(){for(var e=document.getElementsByClassName("amplitude-song-played-progress"),t=0;t<e.length;t++)e[t].value=0}return{sync:e,resetElements:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=a(0),i=l(n),d=a(1),s=l(d),o=a(17),r=l(o),f=a(6),c=l(f),p=a(4),v=l(p),y=a(5),g=l(y),m=a(13),_=l(m),h=a(26),b=l(h),A=a(46),x=l(A),M=a(16),P=l(M),S=a(21),L=l(S),w=a(3),E=l(w),k=a(7),T=l(k),O=a(48),C=l(O),j=a(18),N=l(j),I=a(10),q=l(I),z=a(11),H=l(z),B=a(15),D=l(B),R=a(2),V=l(R),U=a(8),F=l(U),W=a(24),G=l(W),Y=a(9),J=l(Y),$=function(){function e(e){var t=!1;if(c.default.resetConfig(),b.default.initialize(),T.default.initialize(),i.default.debug=void 0!=e.debug&&e.debug,e.songs?0!=e.songs.length?(i.default.songs=e.songs,t=!0):v.default.writeMessage("Please add some songs, to your songs object!"):v.default.writeMessage("Please provide a songs object for AmplitudeJS to run!"),x.default.webAudioAPIAvailable()){if(x.default.configureWebAudioAPI(),document.documentElement.addEventListener("mousedown",function(){"running"!==i.default.context.state&&i.default.context.resume()}),document.documentElement.addEventListener("keydown",function(){"running"!==i.default.context.state&&i.default.context.resume()}),document.documentElement.addEventListener("keyup",function(){"running"!==i.default.context.state&&i.default.context.resume()}),void 0!=e.waveforms&&void 0!=e.waveforms.sample_rate&&(i.default.waveforms.sample_rate=e.waveforms.sample_rate),L.default.init(),void 0!=e.visualizations&&e.visualizations.length>0)for(var l=0;l<e.visualizations.length;l++)P.default.register(e.visualizations[l].object,e.visualizations[l].params)}else v.default.writeMessage("The Web Audio API is not available on this platform. We are using your defined backups!");if(d(),t){i.default.soundcloud_client=void 0!=e.soundcloud_client?e.soundcloud_client:"",i.default.soundcloud_use_art=void 0!=e.soundcloud_use_art?e.soundcloud_use_art:"";var u={};""!=i.default.soundcloud_client?(u=e,r.default.loadSoundCloud(u)):a(e)}v.default.writeMessage("Initialized With: "),v.default.writeMessage(i.default)}function t(){b.default.initialize(),F.default.displayMetaData()}function a(e){e.playlists&&n(e.playlists)>0&&C.default.initialize(e.playlists),void 0!=e.start_song&&e.starting_playlist?g.default.isInt(e.start_song)?E.default.changeSong(i.default.songs[e.start_song],e.start_song):v.default.writeMessage("You must enter an integer index for the start song."):E.default.changeSong(i.default.songs[0],0),void 0!=e.shuffle_on&&e.shuffle_on&&(i.default.shuffle_on=!0,_.default.shuffleSongs(),E.default.changeSong(i.default.shuffle_list[0],0)),i.default.continue_next=void 0==e.continue_next||e.continue_next,i.default.playback_speed=void 0!=e.playback_speed?e.playback_speed:1,s.default.setPlaybackSpeed(i.default.playback_speed),i.default.audio.preload=void 0!=e.preload?e.preload:"auto",i.default.callbacks=void 0!=e.callbacks?e.callbacks:{},i.default.bindings=void 0!=e.bindings?e.bindings:{},i.default.volume=void 0!=e.volume?e.volume:50,i.default.delay=void 0!=e.delay?e.delay:0,i.default.volume_increment=void 0!=e.volume_increment?e.volume_increment:5,i.default.volume_decrement=void 0!=e.volume_decrement?e.volume_decrement:5,s.default.setVolume(i.default.volume),void 0!=e.default_album_art?i.default.default_album_art=e.default_album_art:i.default.default_album_art="",void 0!=e.default_playlist_art?i.default.default_playlist_art=e.default_playlist_art:i.default.default_playlist_art="",l(),void 0!=e.starting_playlist&&""!=e.starting_playlist&&(i.default.active_playlist=e.starting_playlist,void 0!=e.starting_playlist_song&&""!=e.starting_playlist_song?void 0!=u(e.playlists[e.starting_playlist].songs[parseInt(e.starting_playlist_song)])?E.default.changeSongPlaylist(i.default.active_playlist,e.playlists[e.starting_playlist].songs[parseInt(e.starting_playlist_song)],parseInt(e.starting_playlist_song)):(E.default.changeSongPlaylist(i.default.active_playlist,e.playlists[e.starting_playlist].songs[0],0),v.default.writeMessage("The index of "+e.starting_playlist_song+" does not exist in the playlist "+e.starting_playlist)):E.default.changeSong(i.default.active_playlist,e.playlists[e.starting_playlist].songs[0],0),V.default.sync()),T.default.run("initialized")}function l(){N.default.syncMain(),q.default.setMuted(0==i.default.volume),H.default.sync(),G.default.sync(),D.default.resetCurrentTimes(),V.default.syncToPause(),F.default.syncMetaData(),J.default.syncRepeatSong()}function n(e){var t=0,a=void 0;for(a in e)e.hasOwnProperty(a)&&t++;return v.default.writeMessage("You have "+t+" playlist(s) in your config"),t}function d(){for(var e=0;e<i.default.songs.length;e++)void 0==i.default.songs[e].live&&(i.default.songs[e].live=!1)}return{initialize:e,setConfig:a,rebindDisplay:t}}();t.default=$,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){var e=document.querySelectorAll(".amplitude-wave-form");if(e.length>0)for(var t=0;t<e.length;t++){e[t].innerHTML="";var a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("viewBox","0 -1 "+f+" 2"),a.setAttribute("preserveAspectRatio","none");var l=document.createElementNS("http://www.w3.org/2000/svg","g");a.appendChild(l);var u=document.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d",""),u.setAttribute("id","waveform"),l.appendChild(u),e[t].appendChild(a)}}function t(){if(u.default.web_audio_api_available)if(void 0==u.default.waveforms.built[Math.abs(u.default.audio.src.split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0))]){var e=new XMLHttpRequest;e.open("GET",u.default.audio.src,!0),e.responseType="arraybuffer",e.onreadystatechange=function(t){4==e.readyState&&200==e.status&&u.default.context.decodeAudioData(e.response,function(e){r=e,c=l(f,r),a(f,r,c)})},e.send()}else n(u.default.waveforms.built[Math.abs(u.default.audio.src.split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0))])}function a(e,t,a){if(t){for(var l=a.length,i="",d=0;d<l;d++)i+=d%2==0?" M"+~~(d/2)+", "+a.shift():" L"+~~(d/2)+", "+a.shift();u.default.waveforms.built[Math.abs(u.default.audio.src.split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0))]=i,n(u.default.waveforms.built[Math.abs(u.default.audio.src.split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0))])}}function l(e,t){for(var a=t.length/e,l=~~(a/10)||1,u=t.numberOfChannels,n=[],i=0;i<u;i++)for(var d=[],s=t.getChannelData(i),o=0;o<e;o++){for(var r=~~(o*a),f=~~(r+a),c=s[0],p=s[0],v=r;v<f;v+=l){var y=s[v];y>p&&(p=y),y<c&&(c=y)}d[2*o]=p,d[2*o+1]=c,(0===i||p>n[2*o])&&(n[2*o]=p),(0===i||c<n[2*o+1])&&(n[2*o+1]=c)}return n}function n(e){for(var t=document.querySelectorAll(".amplitude-wave-form"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&i(t[a],e),null!=l&&null==u&&d(t[a],e,l),null==l&&null!=u&&s(t[a],e,u),null!=l&&null!=u&&o(t[a],e,l,u)}}function i(e,t){e.querySelector("svg g path").setAttribute("d",t)}function d(e,t,a){if(u.default.active_playlist==a){e.querySelector("svg g path").setAttribute("d",t)}}function s(e,t,a){if(u.default.active_index==a){e.querySelector("svg g path").setAttribute("d",t)}}function o(e,t,a,l){if(u.default.active_playlist==a&&u.default.playlists[u.default.active_playlist].active_index==l){e.querySelector("svg g path").setAttribute("d",t)}}var r="",f=u.default.waveforms.sample_rate,c="";return{init:e,build:t}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){var e={},t=(Math.floor(u.default.audio.currentTime%60)<10?"0":"")+Math.floor(u.default.audio.currentTime%60),a=Math.floor(u.default.audio.currentTime/60),l="00";return a<10&&(a="0"+a),a>=60&&(l=Math.floor(a/60),(a%=60)<10&&(a="0"+a)),e.seconds=t,e.minutes=a,e.hours=l,e}function t(){var e={},t=(Math.floor(u.default.audio.duration%60)<10?"0":"")+Math.floor(u.default.audio.duration%60),a=Math.floor(u.default.audio.duration/60),l="00";return a<10&&(a="0"+a),a>=60&&(l=Math.floor(a/60),(a%=60)<10&&(a="0"+a)),e.seconds=isNaN(t)?"00":t,e.minutes=isNaN(a)?"00":a,e.hours=isNaN(l)?"00":l.toString(),e}function a(){return u.default.audio.currentTime/u.default.audio.duration*100}function l(e){u.default.active_metadata.live||isFinite(e)&&(u.default.audio.currentTime=e)}return{computeCurrentTimes:e,computeSongDuration:t,computeSongCompletionPercentage:a,setCurrentTime:l}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){t(),a(),l(),n()}function t(){for(var e=document.getElementsByClassName("amplitude-buffered-progress"),t=0;t<e.length;t++){var a=e[t].getAttribute("data-amplitude-playlist"),l=e[t].getAttribute("data-amplitude-song-index");null==a&&null==l&&(e[t].value=parseFloat(parseFloat(u.default.buffered)/100))}}function a(){for(var e=document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-playlist="'+u.default.active_playlist+'"]'),t=0;t<e.length;t++){null==e[t].getAttribute("data-amplitude-song-index")&&(e[t].value=parseFloat(parseFloat(u.default.buffered)/100))}}function l(){for(var e=document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="'+u.default.active_index+'"]'),t=0;t<e.length;t++){null==e[t].getAttribute("data-amplitude-playlist")&&(e[t].value=parseFloat(parseFloat(u.default.buffered)/100))}}function n(){for(var e=null!=u.default.active_playlist&&""!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,t=document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="'+e+'"][data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++)t[a].value=parseFloat(parseFloat(u.default.buffered)/100)}function i(){for(var e=document.getElementsByClassName("amplitude-buffered-progress"),t=0;t<e.length;t++)e[t].value=0}return{sync:e,reset:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=document.getElementsByClassName("amplitude-playback-speed"),t=0;t<e.length;t++)switch(e[t].classList.remove("amplitude-playback-speed-10"),e[t].classList.remove("amplitude-playback-speed-15"),e[t].classList.remove("amplitude-playback-speed-20"),u.default.playback_speed){case 1:e[t].classList.add("amplitude-playback-speed-10");break;case 1.5:e[t].classList.add("amplitude-playback-speed-15");break;case 2:e[t].classList.add("amplitude-playback-speed-20")}}return{sync:e}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(3),d=l(i),s=a(7),o=(l(s),a(1)),r=(l(o),a(2)),f=l(r),c=function(){function e(){setTimeout(function(){n.default.continue_next?""==n.default.active_playlist||null==n.default.active_playlist?d.default.setNext(!0):d.default.setNextPlaylist(n.default.active_playlist,!0):n.default.is_touch_moving||(AmplitudeCore.stop(),f.default.sync())},n.default.delay)}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(27),d=l(i),s=a(42),o=l(s),r=a(25),f=l(r),c=a(35),p=l(c),v=a(31),y=l(v),g=a(30),m=l(g),_=a(32),h=l(_),b=a(41),A=l(b),x=a(28),M=l(x),P=a(45),S=l(P),L=a(43),w=l(L),E=a(40),k=l(E),T=a(44),O=l(T),C=a(29),j=l(C),N=a(34),I=l(N),q=a(36),z=l(q),H=a(37),B=l(H),D=a(33),R=l(D),V=a(38),U=l(V),F=a(39),W=l(F),G=a(21),Y=l(G),J=a(4),$=l(J),Q=function(){function e(){$.default.writeMessage("Beginning initialization of event handlers.."),document.addEventListener("touchmove",function(){n.default.is_touch_moving=!0}),document.addEventListener("touchend",function(){n.default.is_touch_moving&&(n.default.is_touch_moving=!1)}),t(),a(),l(),u(),i(),s(),r(),c(),v(),g(),_(),b(),x(),P(),L(),E(),T(),C(),N(),q(),H()}function t(){n.default.audio.removeEventListener("timeupdate",o.default.handle),n.default.audio.addEventListener("timeupdate",o.default.handle),n.default.audio.removeEventListener("durationchange",o.default.handle),n.default.audio.addEventListener("durationchange",o.default.handle)}function a(){document.removeEventListener("keydown",d.default.handle),document.addEventListener("keydown",d.default.handle)}function l(){n.default.audio.removeEventListener("ended",f.default.handle),n.default.audio.addEventListener("ended",f.default.handle)}function u(){n.default.audio.removeEventListener("progress",p.default.handle),n.default.audio.addEventListener("progress",p.default.handle)}function i(){for(var e=document.getElementsByClassName("amplitude-play"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",y.default.handle),e[t].addEventListener("touchend",y.default.handle)):(e[t].removeEventListener("click",y.default.handle),e[t].addEventListener("click",y.default.handle))}function s(){for(var e=document.getElementsByClassName("amplitude-pause"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",m.default.handle),e[t].addEventListener("touchend",m.default.handle)):(e[t].removeEventListener("click",m.default.handle),e[t].addEventListener("click",m.default.handle))}function r(){for(var e=document.getElementsByClassName("amplitude-play-pause"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",h.default.handle),e[t].addEventListener("touchend",h.default.handle)):(e[t].removeEventListener("click",h.default.handle),e[t].addEventListener("click",h.default.handle))}function c(){for(var e=document.getElementsByClassName("amplitude-stop"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",A.default.handle),e[t].addEventListener("touchend",A.default.handle)):(e[t].removeEventListener("click",A.default.handle),e[t].addEventListener("click",A.default.handle))}function v(){for(var e=document.getElementsByClassName("amplitude-mute"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?/iPhone|iPad|iPod/i.test(navigator.userAgent)?$.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"):(e[t].removeEventListener("touchend",M.default.handle),e[t].addEventListener("touchend",M.default.handle)):(e[t].removeEventListener("click",M.default.handle),e[t].addEventListener("click",M.default.handle))}function g(){for(var e=document.getElementsByClassName("amplitude-volume-up"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?/iPhone|iPad|iPod/i.test(navigator.userAgent)?$.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"):(e[t].removeEventListener("touchend",S.default.handle),e[t].addEventListener("touchend",S.default.handle)):(e[t].removeEventListener("click",S.default.handle),e[t].addEventListener("click",S.default.handle))}function _(){for(var e=document.getElementsByClassName("amplitude-volume-down"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?/iPhone|iPad|iPod/i.test(navigator.userAgent)?$.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"):(e[t].removeEventListener("touchend",w.default.handle),e[t].addEventListener("touchend",w.default.handle)):(e[t].removeEventListener("click",w.default.handle),e[t].addEventListener("click",w.default.handle))}function b(){for(var e=window.navigator.userAgent,t=e.indexOf("MSIE "),a=document.getElementsByClassName("amplitude-song-slider"),l=0;l<a.length;l++)t>0||navigator.userAgent.match(/Trident.*rv\:11\./)?(a[l].removeEventListener("change",k.default.handle),a[l].addEventListener("change",k.default.handle)):(a[l].removeEventListener("input",k.default.handle),a[l].addEventListener("input",k.default.handle))}function x(){for(var e=window.navigator.userAgent,t=e.indexOf("MSIE "),a=document.getElementsByClassName("amplitude-volume-slider"),l=0;l<a.length;l++)/iPhone|iPad|iPod/i.test(navigator.userAgent)?$.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"):t>0||navigator.userAgent.match(/Trident.*rv\:11\./)?(a[l].removeEventListener("change",O.default.handle),a[l].addEventListener("change",O.default.handle)):(a[l].removeEventListener("input",O.default.handle),a[l].addEventListener("input",O.default.handle))}function P(){for(var e=document.getElementsByClassName("amplitude-next"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",j.default.handle),e[t].addEventListener("touchend",j.default.handle)):(e[t].removeEventListener("click",j.default.handle),e[t].addEventListener("click",j.default.handle))}function L(){for(var e=document.getElementsByClassName("amplitude-prev"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",I.default.handle),e[t].addEventListener("touchend",I.default.handle)):(e[t].removeEventListener("click",I.default.handle),e[t].addEventListener("click",I.default.handle))}function E(){for(var e=document.getElementsByClassName("amplitude-shuffle"),t=0;t<e.length;t++)e[t].classList.remove("amplitude-shuffle-on"),e[t].classList.add("amplitude-shuffle-off"),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",U.default.handle),e[t].addEventListener("touchend",U.default.handle)):(e[t].removeEventListener("click",U.default.handle),e[t].addEventListener("click",U.default.handle))}function T(){for(var e=document.getElementsByClassName("amplitude-repeat"),t=0;t<e.length;t++)e[t].classList.remove("amplitude-repeat-on"),e[t].classList.add("amplitude-repeat-off"),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",z.default.handle),e[t].addEventListener("touchend",z.default.handle)):(e[t].removeEventListener("click",z.default.handle),e[t].addEventListener("click",z.default.handle))}function C(){for(var e=document.getElementsByClassName("amplitude-repeat-song"),t=0;t<e.length;t++)e[t].classList.remove("amplitude-repeat-on"),e[t].classList.add("amplitude-repeat-off"),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",B.default.handle),e[t].addEventListener("touchend",B.default.handle)):(e[t].removeEventListener("click",B.default.handle),e[t].addEventListener("click",B.default.handle))}function N(){for(var e=document.getElementsByClassName("amplitude-playback-speed"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",R.default.handle),e[t].addEventListener("touchend",R.default.handle)):(e[t].removeEventListener("click",R.default.handle),e[t].addEventListener("click",R.default.handle))}function q(){for(var e=document.getElementsByClassName("amplitude-skip-to"),t=0;t<e.length;t++)/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e[t].removeEventListener("touchend",W.default.handle),e[t].addEventListener("touchend",W.default.handle)):(e[t].removeEventListener("click",W.default.handle),e[t].addEventListener("click",W.default.handle))}function H(){n.default.audio.removeEventListener("canplaythrough",Y.default.build),n.default.audio.addEventListener("canplaythrough",Y.default.build)}return{initialize:e}}();t.default=Q,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(13),o=l(s),r=a(12),f=l(r),c=a(3),p=l(c),v=a(9),y=l(v),g=a(2),m=l(g),_=function(){function e(e){t(e.which)}function t(e){if(void 0!=n.default.bindings[e])switch(n.default.bindings[e]){case"play_pause":a();break;case"next":l();break;case"prev":u();break;case"stop":i();break;case"shuffle":s();break;case"repeat":r()}}function a(){n.default.audio.paused?d.default.play():d.default.pause(),m.default.sync()}function l(){""==n.default.active_playlist||null==n.default.active_playlist?p.default.setNext():p.default.setNextPlaylist(n.default.active_playlist)}function u(){""==n.default.active_playlist||null==n.default.active_playlist?p.default.setPrev():p.default.setPrevPlaylist(n.default.active_playlist)}function i(){m.default.syncToPause(),d.default.stop()}function s(){""==n.default.active_playlist||null==n.default.active_playlist?o.default.toggleShuffle():o.default.toggleShufflePlaylist(n.default.active_playlist)}function r(){f.default.setRepeat(!n.default.repeat),y.default.syncRepeat()}return{handle:e}}();t.default=_,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(10),o=l(s),r=a(11),f=l(r),c=function(){function e(){n.default.is_touch_moving||(0==n.default.volume?d.default.setVolume(n.default.pre_mute_volume):(n.default.pre_mute_volume=n.default.volume,d.default.setVolume(0)),o.default.setMuted(0==n.default.volume),f.default.sync())}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=(l(i),a(2)),s=(l(d),a(7)),o=(l(s),a(3)),r=l(o),f=a(4),c=l(f),p=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist");null==e&&t(),null!=e&&a(e)}}function t(){""==n.default.active_playlist||null==n.default.active_playlist?r.default.setNext():r.default.setNextPlaylist(n.default.active_playlist)}function a(e){e==n.default.active_playlist?r.default.setNextPlaylist(e):c.default.writeMessage("You can not go to the next song on a playlist that is not being played!")}return{handle:e}}();t.default=p,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(6),d=l(i),s=a(1),o=l(s),r=a(2),f=l(r),c=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-song-index"),i=this.getAttribute("data-amplitude-playlist");null==i&&null==e&&t(),null!=i&&null==e&&a(i),null==i&&null!=e&&l(e),null!=i&&null!=e&&u(i,e),d.default.setPlayerState()}}function t(){o.default.pause(),f.default.sync()}function a(e){n.default.active_playlist==e&&(o.default.pause(),f.default.sync())}function l(e){""!=n.default.active_playlist&&null!=n.default.active_playlist||n.default.active_index!=e||(o.default.pause(),f.default.sync())}function u(e,t){n.default.active_playlist==e&&n.default.playlists[e].active_index==t&&(o.default.pause(),f.default.sync())}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(6),d=l(i),s=a(1),o=l(s),r=a(5),f=l(r),c=a(3),p=l(c),v=a(2),y=l(v),g=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-song-index"),i=this.getAttribute("data-amplitude-playlist");null==i&&null==e&&t(),null!=i&&null==e&&a(i),null==i&&null!=e&&l(e),null!=i&&null!=e&&u(i,e),d.default.setPlayerState()}}function t(){o.default.play(),y.default.sync()}function a(e){f.default.newPlaylist(e)&&(p.default.setActivePlaylist(e),n.default.playlists[e].shuffle?p.default.changeSongPlaylist(e,n.default.playlists[e].shuffle_list[0],0):p.default.changeSongPlaylist(e,n.default.playlists[e].songs[0],0)),o.default.play(),y.default.sync()}function l(e){f.default.newPlaylist(null)&&(p.default.setActivePlaylist(null),p.default.changeSong(n.default.songs[e],e)),f.default.newSong(null,e)&&p.default.changeSong(n.default.songs[e],e),o.default.play(),y.default.sync()}function u(e,t){f.default.newPlaylist(e)&&(p.default.setActivePlaylist(e),p.default.changeSongPlaylist(e,n.default.playlists[e].songs[t],t)),f.default.newSong(e,t)&&p.default.changeSongPlaylist(e,n.default.playlists[e].songs[t],t),o.default.play(),y.default.sync()}return{handle:e}}();t.default=g,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(6),d=l(i),s=a(1),o=l(s),r=a(5),f=l(r),c=a(3),p=l(c),v=a(2),y=l(v),g=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist"),i=this.getAttribute("data-amplitude-song-index");null==e&&null==i&&t(),null!=e&&null==i&&a(e),null==e&&null!=i&&l(i),null!=e&&null!=i&&u(e,i),d.default.setPlayerState()}}function t(){n.default.audio.paused?o.default.play():o.default.pause(),y.default.sync()}function a(e){f.default.newPlaylist(e)&&(p.default.setActivePlaylist(e),n.default.playlists[e].shuffle?p.default.changeSongPlaylist(e,n.default.playlists[e].shuffle_list[0],0):p.default.changeSongPlaylist(e,n.default.playlists[e].songs[0],0)),n.default.audio.paused?o.default.play():o.default.pause(),y.default.sync()}function l(e){f.default.newPlaylist(null)&&(p.default.setActivePlaylist(null),p.default.changeSong(n.default.songs[e],e)),f.default.newSong(null,e)&&p.default.changeSong(n.default.songs[e],e),n.default.audio.paused?o.default.play():o.default.pause(),y.default.sync()}function u(e,t){f.default.newPlaylist(e)&&(p.default.setActivePlaylist(e),p.default.changeSongPlaylist(e,n.default.playlists[e].songs[t],t)),f.default.newSong(e,t)&&p.default.changeSongPlaylist(e,n.default.playlists[e].songs[t],t),n.default.audio.paused?o.default.play():o.default.pause(),y.default.sync()}return{handle:e}}();t.default=g,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(24),o=l(s),r=function(){function e(){if(!n.default.is_touch_moving){switch(n.default.playback_speed){case 1:d.default.setPlaybackSpeed(1.5);break;case 1.5:d.default.setPlaybackSpeed(2);break;case 2:d.default.setPlaybackSpeed(1)}o.default.sync()}}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(3),d=l(i),s=a(4),o=l(s),r=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist");null==e&&t(),null!=e&&a(e)}}function t(){""==n.default.active_playlist||null==n.default.active_playlist?d.default.setPrevious():d.default.setPreviousPlaylist(n.default.active_playlist)}function a(e){e==n.default.active_playlist?d.default.setPreviousPlaylist(n.default.active_playlist):o.default.writeMessage("You can not go to the previous song on a playlist that is not being played!")}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(23),d=l(i),s=function(){function e(){if(n.default.audio.buffered.length-1>=0){var e=n.default.audio.buffered.end(n.default.audio.buffered.length-1),t=n.default.audio.duration;n.default.buffered=e/t*100}d.default.sync()}return{handle:e}}();t.default=s,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(12),d=l(i),s=a(9),o=l(s),r=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist");null==e&&t(),null!=e&&a(e)}}function t(){d.default.setRepeat(!n.default.repeat),o.default.syncRepeat()}function a(e){d.default.setRepeatPlaylist(!n.default.playlists[e].repeat,e),o.default.syncRepeatPlaylist(e)}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(12),d=l(i),s=a(9),o=l(s),r=function(){function e(){n.default.is_touch_moving||(d.default.setRepeatSong(!n.default.repeat_song),o.default.syncRepeatSong())}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(13),d=l(i),s=a(18),o=l(s),r=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist");null==e?t():a(e)}}function t(){d.default.toggleShuffle(),o.default.syncMain(n.default.shuffle_on)}function a(e){d.default.toggleShufflePlaylist(e),o.default.syncPlaylist(e)}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(4),d=l(i),s=a(3),o=l(s),r=a(5),f=l(r),c=a(1),p=l(c),v=a(2),y=l(v),g=function(){function e(){if(!n.default.is_touch_moving){var e=this.getAttribute("data-amplitude-playlist"),l=this.getAttribute("data-amplitude-song-index"),u=this.getAttribute("data-amplitude-location");null==u&&d.default.writeMessage("You must add an 'data-amplitude-location' attribute in seconds to your 'amplitude-skip-to' element."),null==l&&d.default.writeMessage("You must add an 'data-amplitude-song-index' attribute to your 'amplitude-skip-to' element."),null!=u&&null!=l&&(null==e?t(parseInt(l),parseInt(u)):a(e,parseInt(l),parseInt(u)))}}function t(e,t){o.default.changeSong(n.default.songs[e],e),p.default.play(),y.default.syncGlobal(),y.default.syncSong(),p.default.skipToLocation(t)}function a(e,t,a){f.default.newPlaylist(e)&&o.default.setActivePlaylist(e),o.default.changeSongPlaylist(e,n.default.playlists[e].songs[t],t),p.default.play(),y.default.syncGlobal(),y.default.syncPlaylist(),y.default.syncSong(),p.default.skipToLocation(a)}return{handle:e}}();t.default=g,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(22),d=l(i),s=a(14),o=l(s),r=function(){function e(){var e=this.value,i=n.default.audio.duration*(e/100),d=this.getAttribute("data-amplitude-playlist"),s=this.getAttribute("data-amplitude-song-index");null==d&&null==s&&t(i,e),null!=d&&null==s&&a(i,e,d),null==d&&null!=s&&l(i,e,s),null!=d&&null!=s&&u(i,e,d,s)}function t(e,t){n.default.active_metadata.live||(d.default.setCurrentTime(e),o.default.sync(t,n.default.active_playlist,n.default.active_index))}function a(e,t,a){n.default.active_playlist==a&&(n.default.active_metadata.live||(d.default.setCurrentTime(e),o.default.sync(t,a,n.default.active_index)))}function l(e,t,a){n.default.active_index==a&&null==n.default.active_playlist&&(n.default.active_metadata.live||(d.default.setCurrentTime(e),o.default.sync(t,n.default.active_playlist,a)))}function u(e,t,a,l){n.default.playlists[a].active_index==l&&n.default.active_playlist==a&&(n.default.active_metadata.live||(d.default.setCurrentTime(e),o.default.sync(t,a,l)))}return{handle:e}}();t.default=r,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(6),d=l(i),s=a(2),o=l(s),r=a(1),f=l(r),c=function(){function e(){n.default.is_touch_moving||(o.default.syncToPause(),f.default.stop(),d.default.setPlayerState())}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(23),d=l(i),s=a(15),o=l(s),r=a(14),f=l(r),c=a(19),p=l(c),v=a(22),y=l(v),g=a(7),m=(l(g),function(){function e(){t(),d.default.sync(),a(),l()}function t(){if(n.default.audio.buffered.length-1>=0){var e=n.default.audio.buffered.end(n.default.audio.buffered.length-1),t=n.default.audio.duration;n.default.buffered=e/t*100}}function a(){if(!n.default.active_metadata.live){var e=y.default.computeCurrentTimes(),t=y.default.computeSongCompletionPercentage(),a=y.default.computeSongDuration();o.default.syncCurrentTimes(e),f.default.sync(t,n.default.active_playlist,n.default.active_index),p.default.sync(t),o.default.syncDurationTimes(e,a)}}function l(){var e=Math.floor(n.default.audio.currentTime);if(void 0!=n.default.active_metadata.time_callbacks&&void 0!=n.default.active_metadata.time_callbacks[e])n.default.active_metadata.time_callbacks[e].run||(n.default.active_metadata.time_callbacks[e].run=!0,n.default.active_metadata.time_callbacks[e]());else for(var t in n.default.active_metadata.time_callbacks)n.default.active_metadata.time_callbacks.hasOwnProperty(t)&&(n.default.active_metadata.time_callbacks[t].run=!1)}return{handle:e}}());t.default=m,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(10),o=l(s),r=a(11),f=l(r),c=function(){function e(){if(!n.default.is_touch_moving){var e=null;e=n.default.volume-n.default.volume_increment>0?n.default.volume-n.default.volume_increment:0,d.default.setVolume(e),o.default.setMuted(0==n.default.volume),f.default.sync()}}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(10),o=l(s),r=a(11),f=l(r),c=function(){function e(){d.default.setVolume(this.value),o.default.setMuted(0==n.default.volume),f.default.sync()}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(1),d=l(i),s=a(10),o=l(s),r=a(11),f=l(r),c=function(){function e(){if(!n.default.is_touch_moving){var e=null;e=n.default.volume+n.default.volume_increment<=100?n.default.volume+n.default.volume_increment:100,d.default.setVolume(e),o.default.setMuted(0==n.default.volume),f.default.sync()}}return{handle:e}}();t.default=c,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){var e=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext;e?(u.default.context=new e,u.default.analyser=u.default.context.createAnalyser(),u.default.source=u.default.context.createMediaElementSource(u.default.audio),u.default.source.connect(u.default.analyser),u.default.analyser.connect(u.default.context.destination),u.default.audio.crossOrigin="anonymous"):AmplitudeHelpers.writeDebugMessage("Web Audio API is unavailable! We will set any of your visualizations with your back up definition!")}function t(){var e=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext;return u.default.web_audio_api_available=!1,e?(u.default.web_audio_api_available=!0,!0):(u.default.web_audio_api_available=!1,!1)}return{configureWebAudioAPI:e,webAudioAPIAvailable:t}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(20),n=l(u),i=a(0),d=l(i),s=a(1),o=l(s),r=a(13),f=l(r),c=a(6),p=l(c),v=a(3),y=l(v),g=a(12),m=l(g),_=a(5),h=l(_),b=a(16),A=l(b),x=a(18),M=l(x),P=a(9),S=l(P),L=a(14),w=l(L),E=a(19),k=l(E),T=a(15),O=l(T),C=a(2),j=l(C),N=a(8),I=l(N),q=a(4),z=l(q),H=a(17),B=l(H),D=function(){function e(e){n.default.initialize(e)}function t(){return d.default}function a(){n.default.rebindDisplay()}function l(){return d.default.active_playlist}function u(){return d.default.playback_speed}function i(){return d.default.repeat}function s(e){return d.default.playlists[e].repeat}function r(){return d.default.shuffle_on}function c(e){return d.default.playlists[e].shuffle}function v(e){f.default.setShuffle(e),M.default.syncMain()}function g(e,t){f.default.setShufflePlaylist(e,t),M.default.syncMain(),M.default.syncPlaylist(e)}function _(e){m.default.setRepeat(e),S.default.syncRepeat()}function b(e,t){m.default.setRepeatPlaylist(t,e),S.default.syncRepeatPlaylist(e)}function x(e){d.default.is_touch_moving||(m.default.setRepeatSong(!d.default.repeat_song),S.default.syncRepeatSong())}function P(){return d.default.default_album_art}function L(){return d.default.default_playlist_art}function E(e){d.default.default_album_art=e}function T(e){d.default.default_plalist_art=e}function C(){return d.default.audio.currentTime/d.default.audio.duration*100}function N(){return d.default.audio.currentTime}function q(){return d.default.audio.duration}function H(e){"number"==typeof e&&e>0&&e<100&&(d.default.audio.currentTime=d.default.audio.duration*(e/100))}function D(e){d.default.debug=e}function R(){return d.default.active_metadata}function V(){return d.default.playlists[d.default.active_playlist]}function U(e){return d.default.songs[e]}function F(e,t){return d.default.playlists[e].songs[t]}function W(e){return void 0==d.default.songs&&(d.default.songs=[]),d.default.songs.push(e),d.default.shuffle_on&&d.default.shuffle_list.push(e),B.default.isSoundCloudURL(e.url)&&B.default.resolveIndividualStreamableURL(e.url,null,d.default.songs.length-1,d.default.shuffle_on),d.default.songs.length-1}function G(e,t){return void 0!=d.default.playlists[t]?(d.default.playlists[t].songs.push(e),d.default.playlists[t].shuffle&&d.default.playlists[t].shuffle_list.push(e),B.default.isSoundCloudURL(e.url)&&B.default.resolveIndividualStreamableURL(e.url,t,d.default.playlists[t].songs.length-1,d.default.playlists[t].shuffle),d.default.playlists[t].songs.length-1):(z.default.writeMessage("Playlist doesn't exist!"),null)}function Y(e,t,a){if(void 0==d.default.playlists[e]){d.default.playlists[e]={};var l=["repeat","shuffle","shuffle_list","songs","src"];for(var u in t)l.indexOf(u)<0&&(d.default.playlists[e][u]=t[u]);return d.default.playlists[e].songs=a,d.default.playlists[e].active_index=null,d.default.playlists[e].repeat=!1,d.default.playlists[e].shuffle=!1,d.default.playlists[e].shuffle_list=[],d.default.playlists[e]}return z.default.writeMessage("A playlist already exists with that key!"),null}function J(e){d.default.songs.splice(e,1)}function $(e,t){void 0!=d.default.playlists[t]&&d.default.playlists[t].songs.splice(e,1)}function Q(e){e.url?(d.default.audio.src=e.url,d.default.active_metadata=e,d.default.active_album=e.album):z.default.writeMessage("The song needs to have a URL!"),o.default.play(),j.default.sync(),I.default.displayMetaData(),w.default.resetElements(),k.default.resetElements(),O.default.resetCurrentTimes(),O.default.resetDurationTimes(),p.default.setPlayerState()}function X(e){o.default.stop(),h.default.newPlaylist(null)&&(y.default.setActivePlaylist(null),y.default.changeSong(d.default.songs[e],e)),h.default.newSong(null,e)&&y.default.changeSong(d.default.songs[e],e),o.default.play(),p.default.setPlayerState(),j.default.sync()}function K(e,t){o.default.stop(),h.default.newPlaylist(t)&&(y.default.setActivePlaylist(t),y.default.changeSongPlaylist(t,d.default.playlists[t].songs[e],e)),h.default.newSong(t,e)&&y.default.changeSongPlaylist(t,d.default.playlists[t].songs[e],e),j.default.sync(),o.default.play(),p.default.setPlayerState()}function Z(){o.default.play(),p.default.setPlayerState()}function ee(){o.default.pause(),p.default.setPlayerState()}function te(){return d.default.audio}function ae(){return d.default.analyser}function le(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;""==e||null==e?null==d.default.active_playlist||""==d.default.active_playlist?y.default.setNext():y.default.setNextPlaylist(d.default.active_playlist):y.default.setNextPlaylist(e)}function ue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;""==e||null==e?null==d.default.active_playlist||""==d.default.active_playlist?y.default.setPrevious():y.default.setPreviousPlaylist(d.default.active_playlist):y.default.setPreviousPlaylist(e)}function ne(){return d.default.songs}function ie(e){return d.default.playlists[e].songs}function de(){return d.default.shuffle_on?d.default.shuffle_list:d.default.songs}function se(e){return d.default.playlists[e].shuffle?d.default.playlists[e].shuffle_list:d.default.playlists[e].songs}function oe(){return parseInt(d.default.active_index)}function re(){return d.default.version}function fe(){return d.default.buffered}function ce(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e=parseInt(e),null!=a?(h.default.newPlaylist(a)&&y.default.setActivePlaylist(a),y.default.changeSongPlaylist(a,d.default.playlists[a].songs[t],t),o.default.play(),j.default.syncGlobal(),j.default.syncPlaylist(),j.default.syncSong(),o.default.skipToLocation(e)):(y.default.changeSong(d.default.songs[t],t),o.default.play(),j.default.syncGlobal(),j.default.syncSong(),o.default.skipToLocation(e))}function pe(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(""!=a&&null!=a&&void 0!=d.default.playlists[a])for(var l in t)t.hasOwnProperty(l)&&"url"!=l&&"URL"!=l&&"live"!=l&&"LIVE"!=l&&(d.default.playlists[a].songs[e][l]=t[l]);else for(var l in t)t.hasOwnProperty(l)&&"url"!=l&&"URL"!=l&&"live"!=l&&"LIVE"!=l&&(d.default.songs[e][l]=t[l]);I.default.displayMetaData(),I.default.syncMetaData()}function ve(e,t){if(void 0!=d.default.playlists[e]){var a=["repeat","shuffle","shuffle_list","songs","src"];for(var l in t)t.hasOwnProperty(l)&&a.indexOf(l)<0&&(d.default.playlists[e][l]=t[l]);I.default.displayPlaylistMetaData()}else z.default.writeMessage("You must provide a valid playlist key!")}function ye(e){d.default.delay=e}function ge(){return d.default.delay}function me(){return d.default.player_state}function _e(e,t){A.default.register(e,t)}function he(e,t){void 0!=d.default.playlists[e]?void 0!=d.default.visualizations.available[t]?d.default.playlists[e].visualization=t:z.default.writeMessage("A visualization does not exist for the key provided."):z.default.writeMessage("The playlist for the key provided does not exist")}function be(e,t){d.default.songs[e]?void 0!=d.default.visualizations.available[t]?d.default.songs[e].visualization=t:z.default.writeMessage("A visualization does not exist for the key provided."):z.default.writeMessage("A song at that index is undefined")}function Ae(e,t,a){void 0!=d.default.playlists[e].songs[t]?void 0!=d.default.visualizations.available[a]?d.default.playlists[e].songs[t].visualization=a:z.default.writeMessage("A visualization does not exist for the key provided."):z.default.writeMessage("The song in the playlist at that key is not defined")}function xe(e){void 0!=d.default.visualizations.available[e]?d.default.visualization=e:z.default.writeMessage("A visualization does not exist for the key provided.")}return{init:e,getConfig:t,bindNewElements:a,getActivePlaylist:l,getPlaybackSpeed:u,getRepeat:i,getRepeatPlaylist:s,getShuffle:r,getShufflePlaylist:c,setShuffle:v,setShufflePlaylist:g,setRepeat:_,setRepeatSong:x,setRepeatPlaylist:b,getDefaultAlbumArt:P,setDefaultAlbumArt:E,getDefaultPlaylistArt:L,setDefaultPlaylistArt:T,getSongPlayedPercentage:C,setSongPlayedPercentage:H,getSongPlayedSeconds:N,getSongDuration:q,setDebug:D,getActiveSongMetadata:R,getActivePlaylistMetadata:V,getSongAtIndex:U,getSongAtPlaylistIndex:F,addSong:W,addSongToPlaylist:G,removeSong:J,removeSongFromPlaylist:$,playNow:Q,playSongAtIndex:X,playPlaylistSongAtIndex:K,play:Z,pause:ee,getAudio:te,getAnalyser:ae,next:le,prev:ue,getSongs:ne,getSongsInPlaylist:ie,getSongsState:de,getSongsStatePlaylist:se,getActiveIndex:oe,getVersion:re,getBuffered:fe,skipTo:ce,setSongMetaData:pe,setPlaylistMetaData:ve,setDelay:ye,getDelay:ge,getPlayerState:me,addPlaylist:Y,registerVisualization:_e,setPlaylistVisualization:he,setSongVisualization:be,setSongInPlaylistVisualization:Ae,setGlobalVisualization:xe}}();t.default=D,e.exports=t.default},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(0),n=l(u),i=a(4),d=l(i),s=a(5),o=l(s),r=a(8),f=l(r),c=a(17),p=l(c),v=function(){function e(e){n.default.playlists=e,a(),l(),t(),u(),i(),s(),r()}function t(){for(var e in n.default.playlists)n.default.playlists[e].active_index=null}function a(){for(var e in n.default.playlists)if(n.default.playlists.hasOwnProperty(e)&&n.default.playlists[e].songs)for(var t=0;t<n.default.playlists[e].songs.length;t++)o.default.isInt(n.default.playlists[e].songs[t])&&(n.default.playlists[e].songs[t]=n.default.songs[n.default.playlists[e].songs[t]]),o.default.isInt(n.default.playlists[e].songs[t])&&!n.default.songs[n.default.playlists[e].songs[t]]&&d.default.writeMessage("The song index: "+n.default.playlists[e].songs[t]+" in playlist with key: "+e+" is not defined in your songs array!")}function l(){for(var e in n.default.playlists)if(n.default.playlists.hasOwnProperty(e))for(var t=0;t<n.default.playlists[e].songs.length;t++)p.default.isSoundCloudURL(n.default.playlists[e].songs[t].url)&&void 0==n.default.playlists[e].songs[t].soundcloud_data&&p.default.resolveIndividualStreamableURL(n.default.playlists[e].songs[t].url,e,t)}function u(){for(var e in n.default.playlists)n.default.playlists[e].shuffle=!1}function i(){for(var e in n.default.playlists)n.default.playlists[e].repeat=!1}function s(){for(var e in n.default.playlists)n.default.playlists[e].shuffle_list=[]}function r(){for(var e in n.default.playlists)f.default.setFirstSongInPlaylist(n.default.playlists[e].songs[0],e)}return{initialize:e}}();t.default=v,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(){for(var e=document.getElementsByClassName("amplitude-song-container"),t=0;t<e.length;t++)e[t].classList.remove("amplitude-active-song-container");if(""==u.default.active_playlist||null==u.default.active_playlist){if(document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="'+u.default.active_index+'"]'))for(var a=document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="'+u.default.active_index+'"]'),l=0;l<a.length;l++)a[l].hasAttribute("data-amplitude-playlist")||a[l].classList.add("amplitude-active-song-container")}else{var n=null!=u.default.active_playlist&&""!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null;if(document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="'+n+'"][data-amplitude-playlist="'+u.default.active_playlist+'"]'))for(var i=document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="'+n+'"][data-amplitude-playlist="'+u.default.active_playlist+'"]'),d=0;d<i.length;d++)i[d].classList.add("amplitude-active-song-container")}}return{setActive:e}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-current-hours"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-current-hours[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-current-hours"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-current-minutes"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-current-minutes[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-current-minutes"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-current-seconds"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-current-seconds[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-current-seconds"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){var t=document.querySelectorAll(".amplitude-current-time"),a=e.minutes+":"+e.seconds;e.hours>0&&(a=e.hours+":"+a);for(var l=0;l<t.length;l++){var u=t[l].getAttribute("data-amplitude-playlist"),n=t[l].getAttribute("data-amplitude-song-index");null==u&&null==n&&(t[l].innerHTML=a)}}function a(e){var t=document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=e.minutes+":"+e.seconds;e.hours>0&&(a=e.hours+":"+a);for(var l=0;l<t.length;l++){null==t[l].getAttribute("data-amplitude-song-index")&&(t[l].innerHTML=a)}}function l(e){if(null==u.default.active_playlist){var t=document.querySelectorAll('.amplitude-current-time[data-amplitude-song-index="'+u.default.active_index+'"]'),a=e.minutes+":"+e.seconds;e.hours>0&&(a=e.hours+":"+a);for(var l=0;l<t.length;l++){null==t[l].getAttribute("data-amplitude-playlist")&&(t[l].innerHTML=a)}}}function n(e){var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=e.minutes+":"+e.seconds;e.hours>0&&(l=e.hours+":"+l);for(var n=0;n<a.length;n++)a[n].innerHTML=l}function i(){for(var e=document.querySelectorAll(".amplitude-current-time"),t=0;t<e.length;t++)e[t].innerHTML="00:00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e,u){var i=d(e,u);t(i),a(i),l(i),n(i)}function t(e){for(var t=document.querySelectorAll(".amplitude-time-remaining"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-time-remaining[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-time-remaining"),t=0;t<e.length;t++)e[t].innerHTML="00"}function d(e,t){var a="00:00",l=parseInt(e.seconds)+60*parseInt(e.minutes)+60*parseInt(e.hours)*60,u=parseInt(t.seconds)+60*parseInt(t.minutes)+60*parseInt(t.hours)*60;if(!isNaN(l)&&!isNaN(u)){var n=u-l,i=Math.floor(n/3600),d=Math.floor((n-3600*i)/60),s=n-3600*i-60*d;a=(d<10?"0"+d:d)+":"+(s<10?"0"+s:s),i>0&&(a=i+":"+a)}return a}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-duration-hours"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-duration-hours[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-duration-hours"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-duration-minutes"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-duration-minutes"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){t(e),a(e),l(e),n(e)}function t(e){for(var t=document.querySelectorAll(".amplitude-duration-seconds"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data--amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-duration-seconds"),t=0;t<e.length;t++)e[t].innerHTML="00"}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(l),n=function(){function e(e){var u=d(e);t(u),a(u),l(u),n(u)}function t(e){for(var t=document.querySelectorAll(".amplitude-duration-time"),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist"),u=t[a].getAttribute("data-amplitude-song-index");null==l&&null==u&&(t[a].innerHTML=e)}}function a(e){for(var t=document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="'+u.default.active_playlist+'"]'),a=0;a<t.length;a++){null==t[a].getAttribute("data-amplitude-song-index")&&(t[a].innerHTML=e)}}function l(e){if(null==u.default.active_playlist)for(var t=document.querySelectorAll('.amplitude-duration-time[data-amplitude-song-index="'+u.default.active_index+'"]'),a=0;a<t.length;a++){var l=t[a].getAttribute("data-amplitude-playlist");null==l&&(t[a].innerHTML=e)}}function n(e){for(var t=""!=u.default.active_playlist&&null!=u.default.active_playlist?u.default.playlists[u.default.active_playlist].active_index:null,a=document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="'+u.default.active_playlist+'"][data-amplitude-song-index="'+t+'"]'),l=0;l<a.length;l++)a[l].innerHTML=e}function i(){for(var e=document.querySelectorAll(".amplitude-duration-time"),t=0;t<e.length;t++)e[t].innerHTML="00:00"}function d(e){var t="00:00";return isNaN(e.minutes)||isNaN(e.seconds)||(t=e.minutes+":"+e.seconds,!isNaN(e.hours)&&e.hours>0&&(t=e.hours+":"+t)),t}return{sync:e,resetTimes:i}}();t.default=n,e.exports=t.default},function(e,t){e.exports={name:"amplitudejs",version:"4.0.0",description:"A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://521dimensions.com/open-source/amplitudejs",main:"dist/amplitude.js",devDependencies:{"babel-core":"^6.18.2","babel-loader":"^7.0.0","babel-plugin-add-module-exports":"0.2.1","babel-polyfill":"^6.16.0","babel-preset-es2015":"^6.18.0",husky:"^1.2.0",jest:"^23.6.0",prettier:"1.15.1","pretty-quick":"^1.8.0",watch:"^1.0.2",webpack:"^2.6.0"},directories:{doc:"docs"},files:["dist"],scripts:{build:"node_modules/.bin/webpack",watch:"watch 'node_modules/.bin/webpack' dist",prettier:"npx pretty-quick",test:"jest"},repository:{type:"git",url:"git+https://github.com/521dimensions/amplitudejs.git"},keywords:["webaudio","html5","javascript","audio-player"],author:"521 Dimensions (https://521dimensions.com)",license:"MIT",bugs:{url:"https://github.com/521dimensions/amplitudejs/issues"},homepage:"https://github.com/521dimensions/amplitudejs#readme"}}])});
/*!
  * Bootstrap v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Amplitude", [], factory);
	else if(typeof exports === 'object')
		exports["Amplitude"] = factory();
	else
		root["Amplitude"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _package = __webpack_require__(59);

module.exports = {
  version: _package.version,

  audio: new Audio(),

  active_metadata: {},

  active_album: "",

  active_index: 0,

  active_playlist: null,

  playback_speed: 1.0,

  callbacks: {},

  songs: [],

  playlists: {},

  start_song: "",

  starting_playlist: "",

  starting_playlist_song: "",

  repeat: false,

  repeat_song: false,

  shuffle_list: {},

  shuffle_on: false,

  default_album_art: "",

  default_playlist_art: "",

  debug: false,

  volume: 0.5,

  pre_mute_volume: 0.5,

  volume_increment: 5,

  volume_decrement: 5,

  soundcloud_client: "",

  soundcloud_use_art: false,

  soundcloud_song_count: 0,

  soundcloud_songs_ready: 0,

  is_touch_moving: false,

  buffered: 0,

  bindings: {},

  continue_next: true,

  delay: 0,

  player_state: "stopped",

  web_audio_api_available: false,

  context: null,

  source: null,

  analyser: null,

  visualizations: {
    available: [],

    active: [],

    backup: ""
  },

  waveforms: {
    sample_rate: 100,

    built: []
  }
}; /**
    * These variables make Amplitude run. The config is the most important
    * containing active settings and parameters.
    *
    * The config JSON is the global settings for ALL of Amplitude functions.
    * This is global and contains all of the user preferences. The default
    * settings are set, and the user overwrites them when they initialize
    * Amplitude.
    *
    * @module config
    * @type {object}
    * @property {string}  	config.version          				- The current version of AmplitudeJS.
    * @property {object} 	config.audio 		 								-	Handles all of the audio.
    * @property {object} 	config.active_metadata					- Contains the active metadata for the song.
    * @property {string} 	config.active_album							- Holds the active album name. Used to check and see if the album changed and run the album changed callback.
    * @property {number} 	config.active_index							- Contains the index of the actively playing song.
    * @property {string} 	config.active_playlist					- Contains the key to the active playlist index.
    * @property {number} 	config.playback_speed						- Sets the initial playback speed of the song. The values for this can be 1.0, 1.5, 2.0
    * @property {object} 	config.callbacks								- The user can pass a JSON object with a key => value store of callbacks to be run at certain events.
    * @property {array} 		config.songs										- Contains all of the songs the user has passed to Amplitude to use.
    * @property {object} 	config.playlists								- Contains all of the playlists the user created.
    * @property {object} 	config.start_song 							- The index of the song that AmplitudeJS should start with.
    * @property {string} 	config.starting_playlist 				- The starting playlist the player will intiialize to.
    * @property {string} 	config.starting_playlist_song 	- The index of the song in the playlist that should be started.
    * @property {boolean} 	config.repeat 									- When repeat is on, when the song ends the song will replay itself.
    * @property {object} 	config.shuffle_list							- When shuffled, gets populated with the songs the user provided in a random order.
    * @property {boolean} 	config.shuffle_on								- When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list
    * @property {string}		config.default_album_art 				- The user can set default album art to be displayed if the song they set doesn't contain album art.
    * @property {string} 	config.default_playlist_art 		- The user can set default playlist art to be displayed if the playlist they are setting meta data for doesn't contain an art picture.
    * @property {boolean} 	config.debug										- When set to true, AmplitudeJS will print to the console any errors providing helpful feedback to the user.
    * @property {number} 	config.volume 									- The user can set the initial volume to a number between 0 and 1 over-riding the default of .5
    * @property {number} 	config.pre_mute_volume 					- This is set on mute so that when a user un-mutes AmplitudeJS knows what to restore the volume to.
    * @property {number}		config.volume_increment 				- The default values are an integer between 1 and 100 for how much the volume should increase when the user presses the volume up button.
    * @property {number}		config.volume_decrement 				- The default values are an integer between 1 and 100 for how much the volume should decrease when the user presses the volume down button.
    * @property {string} 	config.soundcloud_client 				- When using SoundCloud, the user will have to provide their API Client ID
    * @property {boolean} 	config.soundcloud_use_art 			- The user can set this to true and AmplitudeJS will use the album art for the song returned from the Soundcloud API
    * @property {number} 	config.soundcloud_song_count 		- Used on config to count how many songs are from Soundcloud and compare it to how many are ready for when to move to the rest of the configuration
    * @property {number} 	config.soundcloud_songs_ready 	- Used on config to count how many songs are ready so when we get all of the data from the SoundCloud API that we need this should match the SoundCloud song count meaning we can move to the rest of the config.
    * @property {integer}	config.is_touch_moving 					- Flag for if the user is moving the screen.
    * @property {boolean}	config.buffered									- How much of the song is buffered.
    * @property {object} 	config.bindings									- Array of bindings to certain key events.
    * @property {boolean} 	config.continue_next 						- Determines when a song ends, we should continue to the next song.
    * @property {number}   config.delay 										- Sets the delay between songs in MS.
    * @property {boolean}  config.use_web_audio_api 				- Flag that determines if the user wants to use Web Audio API Components.
    * @property {boolean}  config.web_audio_api_available  - Flag that determines if the Web Audio API is available.
    * @property {object}  	config.context 									- Web Audio API Context
    * @property {object}		config.source 									- Web Audio API Source
    * @property {object} 	config.analyser 								- Web Audio API Analyser
    * @property {string}		config.player_state 						- The current state of the player.
    */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Interacts directly with native functions of the Audio element. Logic
 * leading up to these methods are handled by click handlers which call
 * helpers and visual synchronizers. These are the core functions of AmplitudeJS.
 * Every other function that leads to these prepare the information to be
 * acted upon by these functions.
 *
 * @module core/Core
 */


/**
 * Import the Visualizations from the FX module.
 * @module fx/visualizations
 */


/**
 * Imports AmplitudeJS Callback Utility
 * @module utilities/callbacks
 */


/**
 * Imports the Play/Pause Visual Elements module.
 * @module visual/playPauseElements
 */


/**
 * Imports the Checks module.
 * @module utilities/checks
 */
var Core = function () {
  /**
   * Plays the active song. If the current song is live, it reconnects
   * the stream before playing.
   *
   * Public Accessor: Amplitude.play()
   *
   * @access public
   */
  function play() {
    _visualizations2.default.stop();
    _visualizations2.default.run();

    /*
    If the audio is live we re-conenct the stream.
    */
    if (_config2.default.active_metadata.live) {
      reconnectStream();
    }

    /*
    Mobile remote sources need to be reconnected on play. I think this is
    because mobile browsers are optimized not to load all resources
    for speed reasons. We only do this if mobile and the paused button
    is not clicked. If the pause button was clicked then we don't reconnect
    or the user will lose their place in the stream.
    */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !_config2.default.paused) {
      reconnectStream();
    }

    /*
    Play the song and set the playback rate to the playback
    speed.
    */
    var playPromise = _config2.default.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(function (_) {}).catch(function (error) {});
    }
    _config2.default.audio.play();
    _config2.default.audio.playbackRate = _config2.default.playback_speed;

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();
  }

  /**
   * Pauses the active song. If it's live, it disconnects the stream.
   *
   * Public Accessor: Amplitude.pause()
   *
   * @access public
   */
  function pause() {
    _visualizations2.default.stop();

    /*
    Pause the active song.
    */
    _config2.default.audio.pause();

    /*
    Flag that pause button was clicked.
    */
    _config2.default.paused = true;

    /*
    If the song is live, we disconnect the stream so we aren't
    saving it to memory.
    */
    if (_config2.default.active_metadata.live) {
      disconnectStream();
    }

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();
  }

  /**
   * Stops the active song by setting the current song time to 0.
   * When the user resumes, it will be from the beginning.
   * If it's a live stream it disconnects.
   *
   * Public Accessor: Amplitude.stop()
   *
   * @access public
   */
  function stop() {
    _visualizations2.default.stop();

    /*
    Set the current time of the song to 0 which will reset the song.
    */
    if (_config2.default.audio.currentTime != 0) {
      _config2.default.audio.currentTime = 0;
    }

    /*
    Run pause so the song will stop
    */
    _config2.default.audio.pause();

    /*
    If the song is live, disconnect the stream.
    */
    if (_config2.default.active_metadata.live) {
      disconnectStream();
    }

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();

    /*
    Run the stop callback
    */
    _callbacks2.default.run("stop");
  }

  /**
   * Sets the song volume.
   *
   * Public Accessor: Amplitude.setVolume( volumeLevel )
   *
   * @access public
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    /*
    If the volume is set to mute somewhere else, we sync the display.
    */
    if (volumeLevel == 0) {
      _config2.default.audio.muted = true;
    } else {
      _config2.default.audio.muted = false;
    }

    /*
    Sets the volume in the config so we can reference it later on.
    */
    _config2.default.volume = volumeLevel;

    /*
    Set the volume of the active song.
    */
    _config2.default.audio.volume = volumeLevel / 100;
  }

  /**
   * Sets the song percentage. If it's a live song, we ignore this because
   * we can't skip ahead. This is an issue if you have a playlist with
   * a live source.
   *
   * Public Accessor: Amplitude.setSongLocation( songPercentage )
   *
   * @access public
   * @param {number} songPercentage - A number between 1 and 100 as a percentage of song completion.
   */
  function setSongLocation(songPercentage) {
    /*
    As long as the song is not live, we can set the current time of the
    song to the percentage the user passed in.
    */
    if (!_config2.default.active_metadata.live) {
      _config2.default.audio.currentTime = _config2.default.audio.duration * (songPercentage / 100);
    }
  }

  /**
   * Skips to a location in a song
   *
   * Public Accessor: Amplitude.skipToLocation( seconds )
   *
   * @access public
   * @param {number} seconds - An integer containing the seconds to skip to
   */
  function skipToLocation(seconds) {
    /*
    When the active song can be played through, we can check to
    see if the seconds will work. We only bind the event handler
    once and remove it once it's fired.
    */
    _config2.default.audio.addEventListener("canplaythrough", function () {
      /*
      If the active song duration is greater than or equal to the
      amount of seconds the user wants to skip to and the seconds
      is greater than 0, we skip to the seconds defined.
      */
      if (_config2.default.audio.duration >= seconds && seconds > 0) {
        _config2.default.audio.currentTime = seconds;
      } else {
        _debug2.default.writeMessage("Amplitude can't skip to a location greater than the duration of the audio or less than 0");
      }
    }, { once: true });
  }

  /**
   * Disconnects the live stream
   *
   * Public Accessor: Amplitude.disconnectStream()
   *
   * @access public
   */
  function disconnectStream() {
    _config2.default.audio.src = "";
    _config2.default.audio.load();
  }

  /**
   * Reconnects the live stream
   *
   * Public Accessor: Amplitude.reconnectStream()
   *
   * @access public\
   */
  function reconnectStream() {
    _config2.default.audio.src = _config2.default.active_metadata.url;
    _config2.default.audio.load();
  }

  /**
   * Sets the playback speed for the song.
   *
   * @param {number} playbackSpeed The speed we want the song to play back at.
   */
  function setPlaybackSpeed(playbackSpeed) {
    /*
    Set the config playback speed.
    */
    _config2.default.playback_speed = playbackSpeed;

    /*
    Set the active song playback rate.
    */
    _config2.default.audio.playbackRate = _config2.default.playback_speed;
  }

  /*
  Return publically facing functions
  */
  return {
    play: play,
    pause: pause,
    stop: stop,
    setVolume: setVolume,
    setSongLocation: setSongLocation,
    skipToLocation: skipToLocation,
    disconnectStream: disconnectStream,
    reconnectStream: reconnectStream,
    setPlaybackSpeed: setPlaybackSpeed
  };
}();

/**
 * Import the Config State module.
 * @module utilities/configState
 */


/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */


/**
 * Imports the Meta Data Visual Elements module.
 * @module visual/metaDataElements
 */


/**
 * Imports the Audio Navigation module.
 * @module utilities/audioNavigation
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Core;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the visual representation of AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */
var PlayPauseElements = function () {
  /**
   * Syncs all play pause elements.
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Syncs the global play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncGlobal() {
    /*
      Get the active song state.
    */
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all play pause buttons.
    */
    var playPauseElements = document.querySelectorAll(".amplitude-play-pause");

    /*
      Iterate over all of the play pause elements syncing the
      display visually.
    */
    for (var i = 0; i < playPauseElements.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlist = playPauseElements[i].getAttribute("data-amplitude-playlist");
      var song = playPauseElements[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playPauseElements[i]);
            break;
          case "paused":
            setElementPause(playPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the main playlist play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncPlaylist() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all of the main playlist play pause elements
    */
    var playlistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
      Iterate over the play pause elements, syncing the state accordingly.
    */
    for (var i = 0; i < playlistPlayPauseElements.length; i++) {
      /*
        Grab the song attributes from the element.
      */
      var song = playlistPlayPauseElements[i].getAttribute("data-amplitude-song-index");

      /*
        We want only the play pause elements for the main on a
        playlist nothing else. We have another method for the
        song in playlist play pause method.
      */
      if (song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playlistPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(playlistPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncSong() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index that matches the active index attribute.
    */
    var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="' + _config2.default.active_index + '"]');

    /*
      Iterate over all of the song play pause elements
    */
    for (var i = 0; i < songPlayPauseElements.length; i++) {
      /*
        Grab the playlist attributes from the element.
      */
      var playlist = songPlayPauseElements[i].getAttribute("data-amplitude-playlist");

      /*
        We want only the song play pause buttons, not ones scoped in a playlist.
      */
      if (playlist == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(songPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(songPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist play pause buttons to the state of
   * the active song.
   *
   * @access public
   */
  function syncSongInPlaylist() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index attribute. Some have amplitude-playlist which
      means they are individual songs within a playlist.
    */
    var songInPlaylistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
      Iterate over all of the individual play pause elements for songs inspect
      a playlist.
    */
    for (var i = 0; i < songInPlaylistPlayPauseElements.length; i++) {
      /*
        Determines what classes we should add and remove
        from the elements.
      */
      switch (state) {
        case "playing":
          setElementPlay(songInPlaylistPlayPauseElements[i]);
          break;
        case "paused":
          setElementPause(songInPlaylistPlayPauseElements[i]);
          break;
      }
    }
  }

  /**
   * Sets all of the play pause buttons to paused.
   *
   * @access public
   */
  function syncToPause() {
    /*
      Gets all of the play pause elements
    */
    var playPauseElements = document.querySelectorAll(".amplitude-play-pause");

    /*
      Sets all of the elements to pause
    */
    for (var i = 0; i < playPauseElements.length; i++) {
      setElementPause(playPauseElements[i]);
    }
  }

  /**
   * Sets an element to be playing by removing the 'amplitude-paused' class
   * and adding the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the playing class added.
   */
  function setElementPlay(element) {
    element.classList.add("amplitude-playing");
    element.classList.remove("amplitude-paused");
  }

  /**
   * Sets an element to be paused by adding the 'amplitude-paused' class
   * and removing the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the paused class added.
   */
  function setElementPause(element) {
    element.classList.remove("amplitude-playing");
    element.classList.add("amplitude-paused");
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncGlobal: syncGlobal,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    syncToPause: syncToPause
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = PlayPauseElements;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _containerElements = __webpack_require__(49);

var _containerElements2 = _interopRequireDefault(_containerElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Audio Navigation Utility.
 *
 * @module utilities/AudioNavigation
 */


/**
 * Meta Data Elements Module
 *
 * @module visual/MetaDataElements
 */


/**
 * Imports the Song Played Progress Elements Module
 *
 * @module visual/SongPlayedProgressElements
 */


/**
 * Imports the Play Pause Elements Module
 *
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Callbacks Module
 *
 * @module utilities/Callbacks
 */
/**
 * Imports the config module
 * @module config
 */
var AudioNavigation = function () {
  /**
   * Sets the next song
   *
   * @access public
   * @param {boolean} [songEnded=false] If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNext() {
    var songEnded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    /*
      Initializes the next index variable. This will be the
      index of the song that is next.
    */
    var nextIndex = null;
    var nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    var endOfList = false;

    /*
      Determines if we are repeating the song or not. If we are repeating,
      the next song will be the same song index.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.shuffle_on) {
        nextIndex = _config2.default.shuffle_list[_config2.default.active_index].index;
        nextSong = _config2.default.shuffle_list[nextIndex];
      } else {
        nextIndex = _config2.default.active_index;
        nextSong = _config2.default.songs[nextIndex];
      }
    } else {
      /*
        If the shuffle is on, we use the shuffled list of
        songs to determine our next song.
      */
      if (_config2.default.shuffle_on) {
        /*
          If the active shuffle index + 1 is less than the length, then
          we use the next shuffle otherwise we go to the beginning
          of the shuffle list.
        */
        if (parseInt(_config2.default.active_index) + 1 < _config2.default.shuffle_list.length) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = parseInt(_config2.default.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = _config2.default.shuffle_list[nextIndex];
      } else {
        /*
          If the active index + 1 is less than the length of the songs, then
          we use the next song otherwise we go to the beginning of the
          song list.
        */
        if (parseInt(_config2.default.active_index) + 1 < _config2.default.songs.length) {
          nextIndex = parseInt(_config2.default.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next index.
        */
        nextSong = _config2.default.songs[nextIndex];
      }
    }

    /*
      Change the song after the next button has been pressed.
    */
    changeSong(nextSong, nextIndex);

    /*
    	If it's the end of the list and repeat is not on, do nothing.
    */
    if (endOfList && !_config2.default.repeat) {} else {
      /*
      If the song has ended and repeat is on, play the song.
      */
      if (!(songEnded && !_config2.default.repeat && endOfList)) {
        _core2.default.play();
      }
    }

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("next");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the next song in a playlist
   *
   * @param {string} playlist - The playlist being shuffled
   * @param {boolean} [songEnded=false] - If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNextPlaylist(playlist) {
    var songEnded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    /*
      Initializes the next index
    */
    var nextIndex = null;
    var nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    var endOfList = false;

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        nextIndex = _config2.default.playlists[playlist].active_index;
        nextSong = _config2.default.playlists[playlist].shuffle_list[nextIndex];
      } else {
        nextIndex = _config2.default.playlists[playlist].active_index;
        nextSong = _config2.default.playlists[playlist].songs[nextIndex];
      }
    } else {
      /*
        If the playlist is shuffled we get the next index of the playlist.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        /*
          If the active shuffle index + 1 is less than the length of the shuffle list,
          then we use the next shuffle otherwise we go to the beginning of the shuffle list.
        */
        if (parseInt(_config2.default.playlists[playlist].active_index) + 1 < _config2.default.playlists[playlist].shuffle_list.length) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = _config2.default.playlists[playlist].active_index + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = _config2.default.playlists[playlist].shuffle_list[nextIndex];
      } else {
        /*
          If the active index +1 is less than the length of the songs in the playlist,
          then we use the next song otherwise we go to the beginning of the playlist.
        */
        if (parseInt(_config2.default.playlists[playlist].active_index) + 1 < _config2.default.playlists[playlist].songs.length) {
          nextIndex = parseInt(_config2.default.playlists[playlist].active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next song.
        */
        nextSong = _config2.default.playlists[playlist].songs[nextIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, nextSong, nextIndex);

    /*
      If it's the end of the playlist and we aren't repeating, do nothing.
    */
    if (endOfList && !_config2.default.repeat) {} else {
      if (!(songEnded && !_config2.default.repeat && endOfList)) {
        _core2.default.play();
      }
    }

    /*
      Sync the play pause buttons.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("next");

    /*
      Repeat the song.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the previous song on the global songs array.
   *
   * @access private
   */
  function setPrevious() {
    /*
      Initializes the previous index
    */
    var previousIndex = null;
    var previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the config is shuffled, get the now playing index.
      */
      if (_config2.default.shuffle_on) {
        previousIndex = _config2.default.active_index;
        previousSong = _config2.default.shuffle_list[previousIndex];
      } else {
        previousIndex = _config2.default.active_index;
        previousSong = _config2.default.songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(_config2.default.active_index) - 1 >= 0) {
        previousIndex = parseInt(_config2.default.active_index - 1);
      } else {
        previousIndex = parseInt(_config2.default.songs.length - 1);
      }

      /*
        If the config is shuffled, we grab the song from the shuffle list
      */
      if (_config2.default.shuffle_on) {
        /*
          Grab song from the shuffle list
        */
        previousSong = _config2.default.shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = _config2.default.songs[previousIndex];
      }
    }
    /*
      Change the song after the next button has been pressed.
    */
    changeSong(previousSong, previousIndex);

    /*
      Play the newest song.
    */
    _core2.default.play();

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("prev");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the previous playlist song.
   *
   * @access private
   *
   * @prop {string} playlist  - The playlist we are navigating in.
   */
  function setPreviousPlaylist(playlist) {
    /*
      Initializes the previous index
    */
    var previousIndex = null;
    var previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        previousIndex = _config2.default.playlists[playlist].active_index;
        previousSong = _config2.default.playlists[playlist].shuffle_list[previousIndex];
      } else {
        previousIndex = _config2.default.playlists[playlist].active_index;
        previousSong = _config2.default.playlists[playlist].songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(_config2.default.playlists[playlist].active_index) - 1 >= 0) {
        previousIndex = parseInt(_config2.default.playlists[playlist].active_index - 1);
      } else {
        previousIndex = parseInt(_config2.default.playlists[playlist].songs.length - 1);
      }

      /*
        If the playlist is shuffled, we grab the song from the shuffle list
      */
      if (_config2.default.playlists[playlist].shuffle) {
        /*
          Grab song from the shuffle list
        */
        previousSong = _config2.default.playlists[playlist].shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = _config2.default.playlists[playlist].songs[previousIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, previousSong, previousIndex);

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Sync the play pause buttons.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("prev");

    /*
      Repeat the song.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Change song in the songs array.
   *
   * @access private
   * @prop {object} song  - The song we are changing to.
   * @prop {number} index - The index we are changing to.
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   */
  function changeSong(song, index) {
    var direct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    _config2.default.audio.src = song.url;
    _config2.default.active_metadata = song;
    _config2.default.active_album = song.album;

    _config2.default.active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   * Handles a song change in the playlist
   *
   * @access private
   * @prop {string} playlist - The playlist we are changing the song on.
   * @prop {object} song     - The song we are changing to in the playlist.
   * @prop {number} index    - The inded of the song we are changing to in the playlist.
   * @prop {boolean} direct  - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not
   */
  function changeSongPlaylist(playlist, song, index) {
    var direct = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    _config2.default.audio.src = song.url;
    _config2.default.active_metadata = song;
    _config2.default.active_album = song.album;
    _config2.default.active_index = null;

    _config2.default.playlists[playlist].active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   *  Prepares a song change
   *
   * @access private
   * @prop {object} song  - The song we change to.
   */
  function prepareSongChange(song) {
    /*
      Stop the current song.
    */
    _core2.default.stop();

    /*
      Sync all of the elements to a stopped song.
    */
    _playPauseElements2.default.syncToPause();
    _songSliderElements2.default.resetElements();
    _songPlayedProgressElements2.default.resetElements();
    _timeElements2.default.resetCurrentTimes();

    /*
      If an album changes, fire an album change.
    */
    if (_checks2.default.newAlbum(song)) {
      _callbacks2.default.run("album_change");
    }
  }

  /**
   * Updates data on the display after a song has changed.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   *
   * @access private
   */
  function afterSongChange(direct) {
    _metaDataElements2.default.displayMetaData();
    _containerElements2.default.setActive(direct);
    _timeElements2.default.resetDurationTimes();

    /*
      Run the song change callback.
    */
    _callbacks2.default.run("song_change");
  }

  /**
   * Sets the active playlist
   *
   * @access public
   * @param {string} playlist - The string of the playlist being set to active.
   */
  function setActivePlaylist(playlist) {
    /*
      If the active playlist is different than the playlist being set,
      we run the `playlist_changed` callback.
    */
    if (_config2.default.active_playlist != playlist) {
      _callbacks2.default.run("playlist_changed");
      /*
        Set the active playlist to the playlist parameter. Only need to
        set if it's different.
      */
      _config2.default.active_playlist = playlist;

      if (playlist != null) {
        _config2.default.playlists[playlist].active_index = 0;
      }
    }
  }

  /*
    Return the publically facing methods
  */
  return {
    setNext: setNext,
    setNextPlaylist: setNextPlaylist,
    setPrevious: setPrevious,
    setPreviousPlaylist: setPreviousPlaylist,
    changeSong: changeSong,
    changeSongPlaylist: changeSongPlaylist,
    setActivePlaylist: setActivePlaylist
  };
}();

/**
 * Container Elements Module
 *
 * @module visual/ContainerElements
 */


/**
 * Imports the Time Elements Module
 *
 * @module visual/TimeElements
 */


/**
 * Imports the Song Slider Elements Module
 *
 * @module visual/SongSliderElements
 */


/**
 * Imports the Checks Module
 *
 * @module utilities/Checks
 */


/**
 * Imports the Core Module
 *
 * @module core/Core
 */
exports.default = AudioNavigation;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the debugging of AmplitudeJS
 * @module utilities/Debug
 */
var Debug = function () {
  /**
   * Writes out debug message to the console if enabled.
   *
   * Public Accessor: Debug.writeMessage( message )
   *
   * @access public
   * @param {string} message - The string that gets printed to alert the user of a debugging error.
   */
  function writeMessage(message) {
    /*
      If the user has flagged AmplitudeJS to debug, we print out a message
      to the console.
    */
    if (_config2.default.debug) {
      console.log(message);
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    writeMessage: writeMessage
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Debug;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Checks Module. Checks for new songs, albums, and playlists
 *
 * @module utilities/Checks
 */
var Checks = function () {
  /**
   * Checks to see if the new song to be played is different than the song
   * that is currently playing. To be true, the user would have selected
   * play on a new song with a new index. To be false, the user would have
   * clicked play/pause on the song that was playing.
   *
   * Public Accessor: Checks.newSong( playlist, songIndex )
   * @access public
   * @param {string} playlist - The playlist we are checking the new song for. Could be null
   * @param {number} songIndex - The index of the new song to be played.
   * @returns {boolean} True if we are setting a new song, false if we are not setting a new song.
   */
  function newSong(playlist, songIndex) {
    /*
      If the playlists don't match, then it's definitely a new song.
    */
    if (_config2.default.active_playlist != playlist) {
      return true;
    } else {
      /*
        If we aren't in a playlist, we check the active index.
      */
      if (_config2.default.active_playlist == null && playlist == null) {
        /*
          If the active indexes don't match, then it's a new song.
        */
        if (_config2.default.active_index != songIndex) {
          return true;
        } else {
          return false;
        }
      } else {
        /*
          If we are in a playlist, then we check to see if the
          new song index matches the active index.
        */
        if (_config2.default.active_playlist == playlist && _config2.default.playlists[playlist].active_index != songIndex) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  /**
   * Checks to see if there is a new album
   *
   * Public Accessor: Checks.newAlbum( album )
   *
   * @access public
   * @param {string} album - Checks to see if the new song will have a new album.
   * @returns {boolean} True if there is a new album, false if there is not a new ablum.
   */
  function newAlbum(album) {
    if (_config2.default.active_album != album) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks to see if there is a new playlist
   *
   * Public Accessor: Checks.newPlaylist( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist passed in to check against the active playlist.
   * @returns {boolean} True if there is a new playlist, false if there is not a new playlist.
   */
  function newPlaylist(playlist) {
    if (_config2.default.active_playlist != playlist) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Determines if the string passed in is a URL or not
   *
   * Public Accessor: AmplitudeHelpers.isURL( url )
   *
   * @access public
   * @param {string} url - The string we are testing to see if it's a URL.
   * @returns {boolean} True if the string is a url, false if it is not.
   */
  function isURL(url) {
    /*
    Test the string against the URL pattern and return if it matches
    */
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return pattern.test(url);
  }

  /**
   * Determines if what is passed in is an integer or not.
   *
   * Public Accessor: AmplitudeHelpers.isInt( int )
   *
   * @access public
   * @param {string|number} int - The variable we are testing to see is an integer or not.
   * @returns {boolean} If the variable is an integer or not.
   */
  function isInt(int) {
    return !isNaN(int) && parseInt(Number(int)) == int && !isNaN(parseInt(int, 10));
  }

  /**
   * Returns public facing methods
   */
  return {
    newSong: newSong,
    newAlbum: newAlbum,
    newPlaylist: newPlaylist,
    isURL: isURL,
    isInt: isInt
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Checks;
module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the state of the config object.
 *
 * @module utilities/ConfigState
 */
var ConfigState = function () {
  /**
   * Resets the config to the default state. This is called on initialize
   * to ensure the user's config is what matters.
   *
   * Public Accessor: AmplitudeHelpers.resetConfig()
   *
   * @access public
   */
  function resetConfig() {
    _config2.default.audio = new Audio();
    _config2.default.active_metadata = {};
    _config2.default.active_album = "";
    _config2.default.active_index = 0;
    _config2.default.active_playlist = null;
    _config2.default.playback_speed = 1.0;
    _config2.default.callbacks = {};
    _config2.default.songs = [];
    _config2.default.playlists = {};
    _config2.default.start_song = "";
    _config2.default.starting_playlist = "";
    _config2.default.starting_playlist_song = "";
    _config2.default.repeat = false;
    _config2.default.shuffle_list = {};
    _config2.default.shuffle_on = false;
    _config2.default.default_album_art = "";
    _config2.default.default_playlist_art = "";
    _config2.default.debug = false;
    _config2.default.volume = 0.5;
    _config2.default.pre_mute_volume = 0.5;
    _config2.default.volume_increment = 5;
    _config2.default.volume_decrement = 5;
    _config2.default.soundcloud_client = "";
    _config2.default.soundcloud_use_art = false;
    _config2.default.soundcloud_song_count = 0;
    _config2.default.soundcloud_songs_ready = 0;
    _config2.default.continue_next = true;
  }

  /**
   * Sets the state of the player.
   */
  function setPlayerState() {
    /*
      If paused and the current time is 0 the player is stopped.
    */
    if (_config2.default.audio.paused && _config2.default.audio.currentTime == 0) {
      _config2.default.player_state = "stopped";
    }

    /*
      If paused and the current time is greater than 0 the player is
      paused.
    */
    if (_config2.default.audio.paused && _config2.default.audio.currentTime > 0) {
      _config2.default.player_state = "paused";
    }

    /*
      If playing, the current state is playing.
    */
    if (!_config2.default.audio.paused) {
      _config2.default.player_state = "playing";
    }
  }

  /*
  Returns the public facing methods
  */
  return {
    resetConfig: resetConfig,
    setPlayerState: setPlayerState
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ConfigState;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help display the audio's meta data
 *
 * @module visual/MetaDataElements
 */
var MetaDataElements = function () {
  /**
   * Displays the active song's metadata. This is called after a song has
   * been changed. This method takes the active song and displays the
   * metadata. So once the new active song is set, we update all of the
   * screen elements.
   *
   * @access public
   */
  function displayMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
    Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll("[data-amplitude-song-info]");

    /*
    Iterate over all of the song info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      /*
      Get the info so we can check if the active meta data has the
      key.
      */
      var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
      Grab the playlist and song index.
      */
      var playlist = songInfoElements[i].getAttribute("data-amplitude-playlist");
      var songIndex = songInfoElements[i].getAttribute("data-amplitude-song-index");

      /*
      Ensure that we don't set any individual elements now. We set this with the
      sync meta data method. The reason we don't set them here is because
      all individual songs would get the now playing artwork. If the playlists
      match or the element is a main element meaning it doesn't
      belong to a playlist or a song, then we set the song info.
      */
      if (songIndex == null && (_config2.default.active_playlist == playlist || playlist == null && songIndex == null)) {
        /*
        If the active metadata has the key, then we set it,
        otherwise we clear it. If it's an image element then
        we default it to the default info if needed.
        */
        var val = _config2.default.active_metadata[info] != undefined ? _config2.default.active_metadata[info] : null;
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          val = val || _config2.default.default_album_art;
          songInfoElements[i].setAttribute("src", val);
        } else {
          val = val || "";
          songInfoElements[i].innerHTML = val;
        }
      }
    }
  }

  /**
   * Displays the playlist meta data.
   */
  function displayPlaylistMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["image_url"];

    /*
    Get all of the playlist info elements
    */
    var playlistInfoElements = document.querySelectorAll("[data-amplitude-playlist-info]");

    /*
    Iterate over all of the playlist info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < playlistInfoElements.length; i++) {
      /*
      Get the info so we can check if the active meta data has the
      key.
      */
      var info = playlistInfoElements[i].getAttribute("data-amplitude-playlist-info");
      var playlist = playlistInfoElements[i].getAttribute("data-amplitude-playlist");

      if (_config2.default.playlists[playlist][info] != undefined) {
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          playlistInfoElements[i].setAttribute("src", _config2.default.playlists[playlist][info]);
        } else {
          playlistInfoElements[i].innerHTML = _config2.default.playlists[playlist][info];
        }
      } else {
        /*
        We look for the default album art because
        the actual key didn't exist. If the default album
        art doesn't exist then we set the src attribute
        to null.
        */
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          if (_config2.default.default_playlist_art != "") {
            playlistInfoElements[i].setAttribute("src", _config2.default.default_playlist_art);
          } else {
            playlistInfoElements[i].setAttribute("src", "");
          }
        } else {
          playlistInfoElements[i].innerHTML = "";
        }
      }
    }
  }

  /**
   * Sets the first song in the playlist. This is used to fill in the meta
   * data in the playlist
   *
   * @param {object} song 			- The song we are setting to be the first song in the playlist
   * @param {string} playlist 	- Key of the playlist we are setting the first song in
   */
  function setFirstSongInPlaylist(song, playlist) {
    /*
      Define the image meta data keys. These are managed separately
      since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
      Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll('[data-amplitude-song-info][data-amplitude-playlist="' + playlist + '"]');

    /*
      Iterate over all of the song info elements. We will either
      set these to the new values, or clear them if the active song
      doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      /*
        Get the info so we can check if the active meta data has the
        key.
      */
      var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
        Get the song info element playlist.
      */
      var elementPlaylist = songInfoElements[i].getAttribute("data-amplitude-playlist");

      /*
        If the playlists match or the element is a main element, then
        we set the song info.
      */
      if (elementPlaylist == playlist) {
        /*
          If the active metadata has the key, then we set it,
          otherwise we clear it. If it's an image element then
          we default it to the default info if needed.
        */
        if (song[info] != undefined) {
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            songInfoElements[i].setAttribute("src", song[info]);
          } else {
            songInfoElements[i].innerHTML = song[info];
          }
        } else {
          /*
            We look for the default album art because
            the actual key didn't exist. If the default album
            art doesn't exist then we set the src attribute
            to null.
          */
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            if (song.default_album_art != "") {
              songInfoElements[i].setAttribute("src", song.default_album_art);
            } else {
              songInfoElements[i].setAttribute("src", "");
            }
          } else {
            songInfoElements[i].innerHTML = "";
          }
        }
      }
    }
  }

  /**
   * Sets the meta data for songs loaded in the songs array
   */
  function syncMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
    Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll("[data-amplitude-song-info]");

    /*
    Iterate over all of the song info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      var songIndex = songInfoElements[i].getAttribute("data-amplitude-song-index");
      var playlist = songInfoElements[i].getAttribute("data-amplitude-playlist");

      if (songIndex != null && playlist == null) {
        var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
         Get the song info value referenced on the element.  Depending on the type of
         element, we may need to fallback to another value when the direct value
         we want isn't found.
         i.e.
            data-amplitude-song-info="cover_art_url" defaults to using the value
            of "default_album_art" when "cover_art_url" is missing on the song.
        */
        var val = _config2.default.songs[songIndex][info] != undefined ? _config2.default.songs[songIndex][info] : null;
        /*
         If it's an image meta data key, then we set the src attribute of
         the element. Otherwise we set the inner HTML of the element.
        */
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          /*
           If this is an image meta data key and the individual song doesn't
           have the key, use the default_album_art
           */
          val = val || _config2.default.default_album_art;
          songInfoElements[i].setAttribute("src", val);
        } else {
          songInfoElements[i].innerHTML = val;
        }
      }

      /*
        If the song index and playlist are not null, continue.
      */
      if (songIndex != null && playlist != null) {
        /*
          Get the info we are displaying.
        */
        var _info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
          Set the meta data accordingly.
        */
        if (_config2.default.playlists[playlist].songs[songIndex][_info] != undefined) {
          if (imageMetaDataKeys.indexOf(_info) >= 0) {
            songInfoElements[i].setAttribute("src", _config2.default.playlists[playlist].songs[songIndex][_info]);
          } else {
            songInfoElements[i].innerHTML = _config2.default.playlists[playlist].songs[songIndex][_info];
          }
        }
      }
    }

    /*
      Display the playlist meta data.
    */
    displayPlaylistMetaData();
  }

  /**
   * Returns publically facing methods
   */
  return {
    displayMetaData: displayMetaData,
    setFirstSongInPlaylist: setFirstSongInPlaylist,
    syncMetaData: syncMetaData,
    displayPlaylistMetaData: displayPlaylistMetaData
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = MetaDataElements;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the visual syncing to the state of the config for the repeat
 * elements.
 *
 * @module visual/RepeatElements
 */
var RepeatElements = function () {
  /**
   * Syncs repeat for all of the repeat buttons. Users
   * can apply styles to the 'amplitude-repeat-on' and
   * 'amplitude-repeat-off' classes. They represent the state
   * of the player.
   */
  function syncRepeat() {
    /*
    Gets all of the repeat classes
    */
    var repeatClasses = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterate over all of the repeat classes. If repeat is on,
    then add the 'amplitude-repeat-on' class and remove the
    'amplitude-repeat-off' class. If it's off, then do the
    opposite.
    */
    for (var i = 0; i < repeatClasses.length; i++) {
      if (_config2.default.repeat) {
        repeatClasses[i].classList.add("amplitude-repeat-on");
        repeatClasses[i].classList.remove("amplitude-repeat-off");
      } else {
        repeatClasses[i].classList.remove("amplitude-repeat-on");
        repeatClasses[i].classList.add("amplitude-repeat-off");
      }
    }
  }

  /**
   * Syncs repeat for all of the playlist repeat buttons. Users
   * can apply styles to the `amplitude-repeat-on` and `amplitude-repeat-off`
   * classes. They repreent the state of the playlist in the player.
   */
  function syncRepeatPlaylist(playlist) {
    /*
    Gets all of the repeat buttons.
    */
    var repeatButtons = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterate over all of the repeat buttons
    */
    for (var i = 0; i < repeatButtons.length; i++) {
      /*
      Ensure that the repeat button belongs to matches the
      playlist we are syncing the state for.
      */
      if (repeatButtons[i].getAttribute("data-amplitude-playlist") == playlist) {
        /*
        If the state of the playlist is shuffled on, true, then
        we add the 'amplitude-repeat-on' class and remove the
        'amplitude-repeat-off' class. If the player is not shuffled
        then we do the opposite.
        */
        if (_config2.default.playlists[playlist].repeat) {
          repeatButtons[i].classList.add("amplitude-repeat-on");
          repeatButtons[i].classList.remove("amplitude-repeat-off");
        } else {
          repeatButtons[i].classList.add("amplitude-repeat-off");
          repeatButtons[i].classList.remove("amplitude-repeat-on");
        }
      }
    }
  }

  /**
   * Syncs repeat for all of the repeat song buttons. Users
   * can apply styles to the 'amplitude-repeat-song-on' and
   * 'amplitude-repeat-song-off' classes. They represent the state
   * of the player.
   */
  function syncRepeatSong() {
    /*
    Gets all of the repeat song classes
    */
    var repeatSongClasses = document.getElementsByClassName("amplitude-repeat-song");

    /*
    Iterate over all of the repeat song classes. If repeat is on,
    then add the 'amplitude-repeat-song-on' class and remove the
    'amplitude-repeat-song-off' class. If it's off, then do the
    opposite.
    */
    for (var i = 0; i < repeatSongClasses.length; i++) {
      if (_config2.default.repeat_song) {
        repeatSongClasses[i].classList.add("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-off");
      } else {
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.add("amplitude-repeat-song-off");
      }
    }
  }

  /*
    Returns the publically available methods.
  */
  return {
    syncRepeat: syncRepeat,
    syncRepeatPlaylist: syncRepeatPlaylist,
    syncRepeatSong: syncRepeatSong
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = RepeatElements;
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Callback Utility
 *
 * @module utilities/callbacks
 */
/**
 * Imports the config module
 * @module config
 */
var Callbacks = function () {
  /**
   * Initializes the callbacks for the player.
   */
  function initialize() {
    /*
      Event: abort
      https://www.w3schools.com/tags/av_event_abort.asp
    */
    _config2.default.audio.addEventListener("abort", function () {
      run("abort");
    });

    /*
      Event: error
      https://www.w3schools.com/tags/av_event_error.asp
    */
    _config2.default.audio.addEventListener("error", function () {
      run("error");
    });

    /*
      Event: loadeddata
      https://www.w3schools.com/tags/av_event_loadeddata.asp
    */
    _config2.default.audio.addEventListener("loadeddata", function () {
      run("loadeddata");
    });

    /*
      Event: loadedmetadata
      https://www.w3schools.com/tags/av_event_loadedmetadata.asp
    */
    _config2.default.audio.addEventListener("loadedmetadata", function () {
      run("loadedmetadata");
    });

    /*
      Event: loadstart
      https://www.w3schools.com/tags/av_event_loadstart.asp
    */
    _config2.default.audio.addEventListener("loadstart", function () {
      run("loadstart");
    });

    /*
      Event: pause
      https://www.w3schools.com/tags/av_event_pause.asp
    */
    _config2.default.audio.addEventListener("pause", function () {
      run("pause");
    });

    /*
      Event: playing
      https://www.w3schools.com/tags/av_event_playing.asp
    */
    _config2.default.audio.addEventListener("playing", function () {
      run("playing");
    });

    /*
      Event: play
      https://www.w3schools.com/tags/av_event_play.asp
    */
    _config2.default.audio.addEventListener("play", function () {
      run("play");
    });

    /*
      Event: progress
      https://www.w3schools.com/tags/av_event_progress.asp
    */
    _config2.default.audio.addEventListener("progress", function () {
      run("progress");
    });

    /*
      Event: ratechange
      https://www.w3schools.com/tags/av_event_ratechange.asp
    */
    _config2.default.audio.addEventListener("ratechange", function () {
      run("ratechange");
    });

    /*
      Event: seeked
      https://www.w3schools.com/tags/av_event_seeked.asp
    */
    _config2.default.audio.addEventListener("seeked", function () {
      run("seeked");
    });

    /*
      Event: seeking
      https://www.w3schools.com/tags/av_event_seeking.asp
    */
    _config2.default.audio.addEventListener("seeking", function () {
      run("seeking");
    });

    /*
      Event: stalled
      https://www.w3schools.com/tags/av_event_stalled.asp
    */
    _config2.default.audio.addEventListener("stalled", function () {
      run("stalled");
    });

    /*
      Event: suspend
      https://www.w3schools.com/tags/av_event_suspend.asp
    */
    _config2.default.audio.addEventListener("suspend", function () {
      run("suspend");
    });

    /*
      Event: timeupdate
      https://www.w3schools.com/tags/av_event_timeupdate.asp
    */
    _config2.default.audio.addEventListener("timeupdate", function () {
      run("timeupdate");
    });

    /*
      Event: volumechange
      https://www.w3schools.com/tags/av_event_volumechange.asp
    */
    _config2.default.audio.addEventListener("volumechange", function () {
      run("volumechange");
    });

    /*
      Event: waiting
      https://www.w3schools.com/tags/av_event_waiting.asp
    */
    _config2.default.audio.addEventListener("waiting", function () {
      run("waiting");
    });

    /*
      Event: canplay
      https://www.w3schools.com/tags/av_event_canplay.asp
    */
    _config2.default.audio.addEventListener("canplay", function () {
      run("canplay");
    });

    /*
      Event: canplaythrough
      https://www.w3schools.com/tags/av_event_canplaythrough.asp
    */
    _config2.default.audio.addEventListener("canplaythrough", function () {
      run("canplaythrough");
    });

    /*
      Event: durationchange
      https://www.w3schools.com/tags/av_event_durationchange.asp
    */
    _config2.default.audio.addEventListener("durationchange", function () {
      run("durationchange");
    });

    /*
      Event: ended
      https://www.w3schools.com/tags/av_event_ended.asp
    */
    _config2.default.audio.addEventListener("ended", function () {
      run("ended");
    });
  }

  /**
   * Runs a user defined callback method
   *
   * Public Accessor: Callbacks.run( callbackName )
   *
   * @access public
   * @param {string} callbackName - The name of the callback we are going to run.
   */
  function run(callbackName) {
    /*
      Checks to see if a user defined a callback method for the
      callback we are running.
    */
    if (_config2.default.callbacks[callbackName]) {
      /*
        Build the callback function
      */
      var callbackFunction = _config2.default.callbacks[callbackName];

      /*
        Write a debug message stating the callback we are running
      */
      _debug2.default.writeMessage("Running Callback: " + callbackName);

      /*
        Run the callback function and catch any errors
      */
      try {
        callbackFunction();
      } catch (error) {
        if (error.message == "CANCEL EVENT") {
          throw error;
        } else {
          _debug2.default.writeMessage("Callback error: " + error.message);
        }
      }
    }
  }

  return {
    initialize: initialize,
    run: run
  };
}();

/**
 * Imports the debug module
 * @module utilities/debug
 */
exports.default = Callbacks;
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handles the visual state for all of the mute elements.
 *
 * @module visual/MuteElements
 */
var MuteElements = function () {
  /**
   * Syncs mute for all of the mute buttons. This represents the
   * state of the player if it's muted or not.
   *
   * @access public
   * @param {string} state 	- The muted state of the player.
   */
  function setMuted(state) {
    /*
    Get all of the mute buttons.
    */
    var muteClasses = document.getElementsByClassName("amplitude-mute");

    /*
    Iterate over all of the mute classes. If the state of the player
    is not-muted then we add the amplitude-not-muted classe and remove
    the amplitude muted class otherwise we do the opposite.
    */
    for (var i = 0; i < muteClasses.length; i++) {
      if (!state) {
        muteClasses[i].classList.add("amplitude-not-muted");
        muteClasses[i].classList.remove("amplitude-muted");
      } else {
        muteClasses[i].classList.remove("amplitude-not-muted");
        muteClasses[i].classList.add("amplitude-muted");
      }
    }
  }

  return {
    setMuted: setMuted
  };
}();

exports.default = MuteElements;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Keeps the volume slider elements in sync.
 * @module visual/VolumeSliderElements
 */
var VolumeSliderElements = function () {
  /**
   * Visually syncs the volume sliders so they are all the same if there
   * are more than one.
   *
   * @access public
   */
  function sync() {
    var volumeSliders = document.getElementsByClassName("amplitude-volume-slider");

    /*
    Iterates over all of the volume sliders for the song, setting the value
    to the config value.
    */
    for (var i = 0; i < volumeSliders.length; i++) {
      volumeSliders[i].value = _config2.default.audio.volume * 100;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = VolumeSliderElements;
module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Repeater utility. Handles setting the repeat for all scenarios.
 *
 * @module utilities/Repeater
 */
var Repeater = function () {
  /**
   * Sets the state of the repeat for a song.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   */
  function setRepeat(repeat) {
    /*
      Set the global repeat to be toggled
    */
    _config2.default.repeat = repeat;
  }

  /**
   * Sets the state of the repeat for a playlist.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   * @param {string} playlist - The key of the playlist for repeating
   */
  function setRepeatPlaylist(repeat, playlist) {
    /*
      Set the playlist repeat to be toggled.
    */
    _config2.default.playlists[playlist].repeat = repeat;
  }

  /**
   * Sets the state of the repeat song
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat shoudl be on or off for the song.
   */
  function setRepeatSong(repeat) {
    _config2.default.repeat_song = repeat;
  }

  /*
    Returns the public facing methods
  */
  return {
    setRepeat: setRepeat,
    setRepeatPlaylist: setRepeatPlaylist,
    setRepeatSong: setRepeatSong
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Repeater;
module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Shuffle Module. Handles all of the shuffling functionality for
 * AmplitudeJS
 *
 * @module utilities/Shuffler
 */
var Shuffler = function () {
  /**
   * Sets the shuffle state globally
   *
   * @access public
   * @param {boolean} shuffle   - True when we are shuffling, false when we turn it off.
   */
  function setShuffle(shuffle) {
    _config2.default.shuffle_on = shuffle;

    if (shuffle) {
      shuffleSongs();
    } else {
      _config2.default.shuffle_list = [];
    }
  }

  /**
   * Toggles the shuffle status globally.
   *
   * @access public
   */
  function toggleShuffle() {
    /*
      If shuffle is on, we toggle it off. If shuffle is off, we
      toggle on.
    */
    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_on = false;
      _config2.default.shuffle_list = [];
    } else {
      _config2.default.shuffle_on = true;
      shuffleSongs();
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   * @param {boolean} shuffle   True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    _config2.default.playlists[playlist].shuffle = shuffle;

    if (_config2.default.playlists[playlist].shuffle) {
      shufflePlaylistSongs(playlist);
    } else {
      _config2.default.playlists[playlist].shuffle_list = [];
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   */
  function toggleShufflePlaylist(playlist) {
    /*
      If the playlist shuffled is on, we toggle it off. If the
      playlist shuffled is off, we toggle it on.
    */
    if (_config2.default.playlists[playlist].shuffle) {
      _config2.default.playlists[playlist].shuffle = false;
      _config2.default.playlists[playlist].shuffle_list = [];
    } else {
      _config2.default.playlists[playlist].shuffle = true;
      shufflePlaylistSongs(playlist);
    }
  }

  /**
   * Shuffles individual songs in the config
   * Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
   *
   * Public Accessor: Shuffle.shuffleSongs()
   *
   * @access public
   */
  function shuffleSongs() {
    /*
    Builds a temporary array with the length of the config.
    */
    var shuffleTemp = new Array(_config2.default.songs.length);

    /*
    Set the temporary array equal to the songs array.
    */
    for (var i = 0; i < _config2.default.songs.length; i++) {
      shuffleTemp[i] = _config2.default.songs[i];
    }

    /*
    Iterate ove rthe songs and generate random numbers to
    swap the indexes of the shuffle array.
    */
    for (var _i = _config2.default.songs.length - 1; _i > 0; _i--) {
      var randNum = Math.floor(Math.random() * _config2.default.songs.length + 1);
      shuffleSwap(shuffleTemp, _i, randNum - 1);
    }

    /*
    Set the shuffle list to the shuffle temp.
    */
    _config2.default.shuffle_list = shuffleTemp;
  }

  /**
   * Shuffle songs in a playlist
   *
   * Public Accessor: Shuffle.shufflePlaylistSongs( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist we are shuffling.
   */
  function shufflePlaylistSongs(playlist) {
    /*
      Builds a temporary array with the length of the playlist songs.
    */
    var shuffleTemp = new Array(_config2.default.playlists[playlist].songs.length);

    /*
      Set the temporary array equal to the playlist array.
    */
    for (var i = 0; i < _config2.default.playlists[playlist].songs.length; i++) {
      shuffleTemp[i] = _config2.default.playlists[playlist].songs[i];
    }

    /*
      Iterate ove rthe songs and generate random numbers to
      swap the indexes of the shuffle array.
    */
    for (var _i2 = _config2.default.playlists[playlist].songs.length - 1; _i2 > 0; _i2--) {
      var randNum = Math.floor(Math.random() * _config2.default.playlists[playlist].songs.length + 1);
      shuffleSwap(shuffleTemp, _i2, randNum - 1);
    }

    /*
      Set the shuffle list to the shuffle temp.
    */
    _config2.default.playlists[playlist].shuffle_list = shuffleTemp;
  }

  /**
   * Swaps and randomizes the song shuffle.
   *
   * @access private
   * @param {object} shuffleList 	- The list of songs that is going to be shuffled
   * @param {number} original 		- The original index of he song in the songs array
   * @param {number} random 			- The randomized index that will be the new index of the song in the shuffle array.
   */
  function shuffleSwap(shuffleList, original, random) {
    var temp = shuffleList[original];
    shuffleList[original] = shuffleList[random];
    shuffleList[random] = temp;
  }

  /**
   * Returns public facing methods
   */
  return {
    setShuffle: setShuffle,
    toggleShuffle: toggleShuffle,
    setShufflePlaylist: setShufflePlaylist,
    toggleShufflePlaylist: toggleShufflePlaylist,
    shuffleSongs: shuffleSongs,
    shufflePlaylistSongs: shufflePlaylistSongs
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Shuffler;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the visual representation of AmplitudeJS song slider elements.
 * @module visual/SongSliderElements
 */
var SongSliderElements = function () {
  /**
   * Syncs all of the song slider elements.
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function sync(location, playlist, songIndex) {
    syncMain(location);
    syncPlaylist(location, playlist);
    syncSong(location, songIndex);
    syncSongInPlaylist(location, playlist);
  }

  /**
   * Syncs the main slider location
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   */
  function syncMain(location) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    /*
    Gets the main song sliders
    */
    var mainSongSliders = document.querySelectorAll(".amplitude-song-slider");

    /*
    Iterates over all of the main sliders and sets the value to the
    percentage of the song played.
    */
    for (var i = 0; i < mainSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlist = mainSongSliders[i].getAttribute("data-amplitude-playlist");
      var song = mainSongSliders[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        mainSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs playlist song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncPlaylist(location, playlist) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    /*
    Gets the playlist song sliders
    */
    var playlistSongSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="' + playlist + '"]');

    /*
    Iterates over all of the playlist sliders and sets the value to the
    percentage of the song played.
    */
    for (var i = 0; i < playlistSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlistAttribute = playlistSongSliders[i].getAttribute("data-amplitude-playlist");
      var songAttribute = playlistSongSliders[i].getAttribute("data-amplitude-song-index");

      /*
      This method is responsible for only the playlist elements,
      so we make sure the playlist attribute matches what is passed
      in.
      */
      if (playlistAttribute == playlist && songAttribute == null) {
        playlistSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function syncSong(location, songIndex) {
    /*
    We only want to sync song sliders if the playlist is null.
    */
    if (_config2.default.active_playlist == null) {
      /*
      Ensure we have a location that's a number
      */
      location = !isNaN(location) ? location : 0;

      /*
      Gets the individual song sliders
      */
      var songSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-song-index="' + songIndex + '"]');

      /*
      Iterates over all of the individual song sliders and sets the value
      to the percentage of the song played.
      */
      for (var i = 0; i < songSliders.length; i++) {
        /*
         Grab the playlist and song attributes from the element.
        */
        var playlistAttribute = songSliders[i].getAttribute("data-amplitude-playlist");
        var songAttribute = songSliders[i].getAttribute("data-amplitude-song-index");

        /*
        This method is responsible for only the playlist elements,
        so we make sure the playlist attribute matches what is passed
        in.
        */
        if (playlistAttribute == null && songAttribute == songIndex) {
          songSliders[i].value = location;
        }
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncSongInPlaylist(location, playlist) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Gets the song in playlist sliders
    */
    var songInPlaylistSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="' + playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Iterates over all of the song in playlist sliders and sets the value
    to the percentage of the song played.
    */
    for (var i = 0; i < songInPlaylistSliders.length; i++) {
      songInPlaylistSliders[i].value = location;
    }
  }

  /**
   * Visually syncs the song sliders back to 0. This usually happens when
   * a song has changed, we ensure that all song sliders get reset.
   *
   * @access public
   */
  function resetElements() {
    var songSliders = document.getElementsByClassName("amplitude-song-slider");

    /*
    Iterate over all of the song sliders and set them to
    0 essentially resetting them.
    */
    for (var i = 0; i < songSliders.length; i++) {
      songSliders[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncMain: syncMain,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    resetElements: resetElements
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = SongSliderElements;
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currentTimeElements = __webpack_require__(53);

var _currentTimeElements2 = _interopRequireDefault(_currentTimeElements);

var _currentHourElements = __webpack_require__(50);

var _currentHourElements2 = _interopRequireDefault(_currentHourElements);

var _currentMinuteElements = __webpack_require__(51);

var _currentMinuteElements2 = _interopRequireDefault(_currentMinuteElements);

var _currentSecondElements = __webpack_require__(52);

var _currentSecondElements2 = _interopRequireDefault(_currentSecondElements);

var _durationCountDownTimeElements = __webpack_require__(54);

var _durationCountDownTimeElements2 = _interopRequireDefault(_durationCountDownTimeElements);

var _durationHourElements = __webpack_require__(55);

var _durationHourElements2 = _interopRequireDefault(_durationHourElements);

var _durationMinuteElements = __webpack_require__(56);

var _durationMinuteElements2 = _interopRequireDefault(_durationMinuteElements);

var _durationSecondElements = __webpack_require__(57);

var _durationSecondElements2 = _interopRequireDefault(_durationSecondElements);

var _durationTimeElements = __webpack_require__(58);

var _durationTimeElements2 = _interopRequireDefault(_durationTimeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Time Elements Interface. This allows us to update all of the sub time elements
 * through one central point.
 * @module visual/TimeElements
 */


/**
 * Imports the AmplitudeJS Duration Second Elements
 * @module visual/time/DurationSecondElements
 */


/**
 * Imports the AmplitudeJS Duration Hour Elements
 * @module visual/time/DurationHourElements
 */


/**
 * Imports the AmplitudeJS Current Second Elements
 * @module visual/time/CurrentTimeElements
 */


/**
 * Imports the AmplitudeJS Current Hour Elements
 * @module visual/time/CurrentHourElements
 */
var TimeElements = function () {
  /**
   * Resets the current times.
   */
  function resetCurrentTimes() {
    _currentTimeElements2.default.resetTimes();
    _currentHourElements2.default.resetTimes();
    _currentMinuteElements2.default.resetTimes();
    _currentSecondElements2.default.resetTimes();
  }

  /**
   * Syncs the current time elements to the time provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   */
  function syncCurrentTimes(currentTime) {
    _currentTimeElements2.default.sync(currentTime);
    _currentHourElements2.default.sync(currentTime.hours);
    _currentMinuteElements2.default.sync(currentTime.minutes);
    _currentSecondElements2.default.sync(currentTime.seconds);
  }

  /**
   * Resets the duration times.
   */
  function resetDurationTimes() {
    _durationCountDownTimeElements2.default.resetTimes();
    _durationHourElements2.default.resetTimes();
    _durationMinuteElements2.default.resetTimes();
    _durationSecondElements2.default.resetTimes();
    _durationTimeElements2.default.resetTimes();
  }

  /**
   * Syncs the duration times to the times provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   * @param {Object} songDuration - An object representing the duration of the audio
   */
  function syncDurationTimes(currentTime, songDuration) {
    _durationCountDownTimeElements2.default.sync(currentTime, songDuration);
    _durationTimeElements2.default.sync(songDuration);
    _durationHourElements2.default.sync(songDuration.hours);
    _durationMinuteElements2.default.sync(songDuration.minutes);
    _durationSecondElements2.default.sync(songDuration.seconds);
  }

  /**
   * Returns the publically accessible methods.
   */
  return {
    resetCurrentTimes: resetCurrentTimes,
    syncCurrentTimes: syncCurrentTimes,
    resetDurationTimes: resetDurationTimes,
    syncDurationTimes: syncDurationTimes
  };
}();

/**
 * Imports the AmplitudeJS Duration Time Elements
 * @module visual/time/DurationTimeElements
 */


/**
 * Imports the AmplitudeJS Duration Minute Elements
 * @module visual/time/DurationMinuteElements
 */


/**
 * Imports the AmplitudeJS Duration Count Down Time Elements
 * @module visual/time/DurationCountDownTimeElements
 */


/**
 * Imports the AmplitudeJS Current Minute Elements
 * @module visual/time/CurrentMinuteElements
 */
/**
 * Imports the AmplitudeJS Current Time
 * @module visual/time/CurrentTimeElements
 */
exports.default = TimeElements;
module.exports = exports["default"];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the visualizations elements.
 *
 * @module Visualizations
 */
/**
 * Imports the config module
 * @module config
 */
var Visualizations = function () {
  /**
   * Runs all of the visualizations on the screen.
   */
  function run() {
    /*
      Get all of the visualization elements on the page
    */
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    /*
      If the web audio API is available, we display the visualizations.
    */
    if (_config2.default.web_audio_api_available) {
      /*
        If the visualization has not started, there are visualizations available,
        and we have at least one visualization element, then we continue.
      */
      if (Object.keys(_config2.default.visualizations.available).length > 0 && visualizationElements.length > 0) {
        /*
            Iterate over all of the visualizations on the page and activate the
            ones we need.
          */
        for (var i = 0; i < visualizationElements.length; i++) {
          /*
              Grab the playlist and song attributes from the visualization to
              determine which one we run.
            */
          var playlist = visualizationElements[i].getAttribute("data-amplitude-playlist");
          var song = visualizationElements[i].getAttribute("data-amplitude-song-index");

          /*
              If the playlist and song are null, it's a global visualization element.
            */
          if (playlist == null && song == null) {
            runGlobalVisualization(visualizationElements[i]);
          }

          /*
              if the playlist is not null and the song is null it's a playlist visualization
              element.
            */
          if (playlist != null && song == null) {
            runPlaylistVisualization(visualizationElements[i], playlist);
          }

          /*
              If the playlist is null and the song is not null it's a song visualization element.
            */
          if (playlist == null && song != null) {
            runSongVisualization(visualizationElements[i], song);
          }

          /*
              If the playlist and song are not null then it's a song in playlist visualization
              element.
            */
          if (playlist != null && song != null) {
            runSongInPlaylistVisualization(visualizationElements[i], playlist, song);
          }
        }
      }
    } else {
      displayBackups();
    }
  }

  /**
   * Runs a global visualization
   *
   * @param {Node} element  The container element that handles the visualization.
   */
  function runGlobalVisualization(element) {
    /*
      Gets the global visualization index and the active song visualization indexes
      so we know which visualization to use. The song will override the global
    */
    var globalVisualizationIndex = _config2.default.visualization;
    var activeSongVisualizationIndex = _config2.default.active_index != null ? _config2.default.songs[_config2.default.active_index].visualization : _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;

    /*
      If the active song visualization is defined and the visualization exists,
      use that visualization.
    */
    if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
      addToActiveVisualizations(activeSongVisualizationIndex, element);

      /*
      If the user defined a global visualization, use that one.
      */
    } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
      addToActiveVisualizations(globalVisualizationIndex, element);

      /*
      If the user didn't define a global visualization, use the first visualization
      registered if there is one.
      */
    } else {
      /*
        Grab the first registered visualization. If it exists, use that one.
      */
      var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

      if (firstVisualization != null) {
        addToActiveVisualizations(firstVisualization, element);
      }
    }
  }

  /**
   * Run a specific playlist visualization.
   *
   * @param {Node} element  The container element that handles the visualization.
   * @param {string} playlist The key of the playlist we are running the visualization for.
   */
  function runPlaylistVisualization(element, playlist) {
    /*
      If the playlist is equal to the active playlist, then we continue.
    */
    if (playlist == _config2.default.active_playlist) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      var activeSongVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;
      var activePlaylistVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the actual song has a visualization, we run that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the actual playlist has a visualization, run that.
        */
      } else if (activePlaylistVisualizationIndex != undefined && _config2.default.visualizations.available[activePlaylistVisualizationIndex] != undefined) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If a global visualization is defined, run that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song specific visualization.
   *
   * @param {Node} element The container element that handles the visualization.
   * @param {string} song The song index that we are running the visualization for.
   */
  function runSongVisualization(element, song) {
    /*
      If the song is equal to the active song, then we continue.
    */
    if (song == _config2.default.active_index) {
      /*
        Get the indexes of the song
      */
      var activeSongVisualizationIndex = _config2.default.songs[_config2.default.active_index].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the song has a visualization, run that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the global visualization is set, use that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song in playlist visualization.
   *
   * @param {Node} element - The element containing the visualization.
   * @param {string} playlist - The string of the playlist key.
   * @param {index} song - The index of the song in the playlist.
   */
  function runSongInPlaylistVisualization(element, playlist, song) {
    /*
      If the playlist is the same as the active playlist and the active
      index of the song is the same as the song, then we continue.
    */
    if (playlist == _config2.default.active_playlist && _config2.default.playlists[playlist].active_index == song) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      var activeSongVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;
      var activePlaylistVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the active song has a visualization, we use that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the active playlist has a visualization, we use that.
        */
      } else if (activePlaylistVisualizationIndex != undefined && _config2.default.visualizations.available[activePlaylistVisualizationIndex] != undefined) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If the global visualization has been set, we use that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Add a visualization to the array of active visualizations.
   *
   * @param {string} key - The key of the active visualization.
   * @param {Node} element - The element that the visualization will be applied to.
   */
  function addToActiveVisualizations(key, element) {
    var visualization = new _config2.default.visualizations.available[key]["object"]();
    visualization.setPreferences(_config2.default.visualizations.available[key]["preferences"]);
    visualization.startVisualization(element);
    _config2.default.visualizations.active.push(visualization);
  }

  /**
   * Stops all active visualizations.
   */
  function stop() {
    /*
      Iterates over all of the visualizations and stop the visualization.
    */
    for (var i = 0; i < _config2.default.visualizations.active.length; i++) {
      _config2.default.visualizations.active[i].stopVisualization();
    }

    /*
      Clear the active visualizations.
    */
    _config2.default.visualizations.active = [];
  }

  /**
   * Registers any visualization we can use.
   *
   * @param {object} visualization The visualization object itself
   * @param {object} preferences User preferences overrides.
   */
  function register(visualization, preferences) {
    /*
      Initialize the new visualization.
    */
    var newVisualization = new visualization();

    /*
     Adds the visualization to the global config so it knows
     it can be used when playing songs.
      getID is a public function for getting a visualization's id.
     It becomes the key to access the visualization.
    */
    _config2.default.visualizations.available[newVisualization.getID()] = new Array();
    _config2.default.visualizations.available[newVisualization.getID()]["object"] = visualization;
    _config2.default.visualizations.available[newVisualization.getID()]["preferences"] = preferences;
  }

  /**
   * Displays the backups for the visualizations.
   */
  function displayBackups() {
    /*
      Get all of the visualization elements on the page
    */
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    if (visualizationElements.length > 0) {
      for (var x = 0; x < visualizationElements.length; x++) {
        /*
          Grab the playlist and song attributes from the visualization to
          determine which one we run.
        */
        var playlist = visualizationElements[x].getAttribute("data-amplitude-playlist");
        var song = visualizationElements[x].getAttribute("data-amplitude-song-index");

        /*
          If the playlist and song are null, it's a global visualization element.
        */
        if (playlist == null && song == null) {
          displayGlobalBackup(visualizationElements[x]);
        }

        /*
          if the playlist is not null and the song is null it's a playlist visualization
          element.
        */
        if (playlist != null && song == null) {
          displayPlaylistBackup(visualizationElements[x], playlist);
        }

        /*
          If the playlist is null and the song is not null it's a song visualization element.
        */
        if (playlist == null && song != null) {
          displaySongBackup(visualizationElements[x], song);
        }

        /*
          If the playlist and song are not null then it's a song in playlist visualization
          element.
        */
        if (playlist != null && song != null) {
          displaySongInPlaylistBackup(visualizationElements[x], playlist, song);
        }
      }
    }
  }

  /**
   * Displays the global backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayGlobalBackup(element) {
    element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
  }

  /**
   * Displays the playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayPlaylistBackup(element, playlist) {
    if (_config2.default.active_playlist == playlist) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongBackup(element, song) {
    if (_config2.default.active_index == song) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song in playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongInPlaylistBackup(element, playlist, song) {
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[active_playlist].active_index == song) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    run: run,
    stop: stop,
    register: register
  };
}();

/**
 * Imports the debug module
 * @module utilities/Debug
 */
exports.default = Visualizations;
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _init = __webpack_require__(21);

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These helpers wrap around the basic methods of the Soundcloud API
 * and get the information we need from SoundCloud to make the songs
 * streamable through Amplitude
 *
 * @module soundcloud/SoundCloud
 */
/**
 * Imports the config module
 * @module config
 */
var SoundCloud = function () {
  /**
   * Defines the temporary user config used while we configure soundcloud
   * @type {object}
   */
  var tempUserConfig = {};

  /**
   * Loads the soundcloud SDK for use with Amplitude so the user doesn't have
   * to load it themselves.
   * With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
   *
   * @access public
   * @param {object} userConfig 	- The config defined by the user for AmplitudeJS
   */
  function loadSoundCloud(userConfig) {
    /*
    Sets the temporary config to the config passed by the user so we can make changes
    and not break the actual config.
    */
    tempUserConfig = userConfig;

    /*
    Gets the head tag for the document and create a script element.
    */
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");

    script.type = "text/javascript";

    /*
    URL to the remote soundcloud SDK
    */
    script.src = "https://connect.soundcloud.com/sdk.js";
    script.onreadystatechange = initSoundcloud;
    script.onload = initSoundcloud;

    /*
    Add the script to the head of the document.
    */
    head.appendChild(script);
  }

  /**
   * Initializes soundcloud with the key provided.
   *
   * @access private
   */
  function initSoundcloud() {
    /*
    Calls the SoundCloud initialize function
    from their API and sends it the client_id
    that the user passed in.
    */
    SC.initialize({
      client_id: _config2.default.soundcloud_client
    });

    /*
    Gets the streamable URLs to run through Amplitue. This is
    VERY important since Amplitude can't stream the copy and pasted
    link from the SoundCloud page, but can resolve the streaming
    URLs from the link.
    */
    getStreamableURLs();
  }

  /**
   * Gets the streamable URL from the URL provided for
   * all of the soundcloud links.  This will loop through
   * and set all of the information for the soundcloud
   * urls.
   *
   * @access private
   */
  function getStreamableURLs() {
    /*
    Define the regex to find the soundcloud URLs
    */
    var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    for (var i = 0; i < _config2.default.songs.length; i++) {
      /*
      If the URL matches soundcloud, we grab
      that url and get the streamable link
      if there is one.
      */
      if (_config2.default.songs[i].url.match(soundcloud_regex)) {
        _config2.default.soundcloud_song_count++;
        resolveStreamable(_config2.default.songs[i].url, i);
      }
    }
  }

  /**
   * Resolves an individual streamable URL.
   *
   * @param {string} url - The URL of the SoundCloud song to get the streamable URL from.
   * @param {string} playlist - The playlist we are getting the streamable URL for.
   * @param {Integer} index - The index of the song in the playlist or the songs array.
   * @param {boolean} addToShuffleList - Whether we add to the shuffle list for the songs or playlist.
   *
   */
  function resolveIndividualStreamableURL(url, playlist, index) {
    var addToShuffleList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    SC.get("/resolve/?url=" + url, function (sound) {
      /*
        If streamable we get the url and bind the client ID to the end
        so Amplitude can just stream the song normally. We then overwrite
        the url the user provided with the streamable URL.
      */
      if (sound.streamable) {
        if (playlist != null) {
          _config2.default.playlists[playlist].songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

          if (addToShuffleList) {
            _config2.default.playlists[playlist].shuffle_list[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;
          }
          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (_config2.default.soundcloud_use_art) {
            _config2.default.playlists[playlist].songs[index].cover_art_url = sound.artwork_url;

            if (addToShuffleList) {
              _config2.default.playlists[playlist].shuffle_list[index].cover_art_url = sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          _config2.default.playlists[playlist].songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            _config2.default.playlists[playlist].shuffle_list[index].soundcloud_data = sound;
          }
        } else {
          _config2.default.songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

          if (addToShuffleList) {
            _config2.default.shuffle_list[index].stream_url + "?client_id=" + _config2.default.soundcloud_client;
          }

          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (_config2.default.soundcloud_use_art) {
            _config2.default.songs[index].cover_art_url = sound.artwork_url;

            if (addToShuffleList) {
              _config2.default.shuffle_list[index].cover_art_url = sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          _config2.default.songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            _config2.default.shuffle_list[index].soundcloud_data = sound;
          }
        }
      } else {
        if (playlist != null) {
          AmplitudeHelpers.writeDebugMessage(_config2.default.playlists[playlist].songs[index].name + " by " + _config2.default.playlists[playlist].songs[index].artist + " is not streamable by the Soundcloud API");
        } else {
          /*
            If not streamable, then we print a message to the user stating
            that the song with name X and artist X is not streamable. This
            gets printed ONLY if they have debug turned on.
          */
          AmplitudeHelpers.writeDebugMessage(_config2.default.songs[index].name + " by " + _config2.default.songs[index].artist + " is not streamable by the Soundcloud API");
        }
      }
    });
  }

  /**
   * Due to Soundcloud SDK being asynchronous, we need to scope the
   * index of the song in another function. The privateGetSoundcloudStreamableURLs
   * function does the actual iteration and scoping.
   *
   * @access private
   * @param {string} url 		- URL of the soundcloud song
   * @param {number} index 	- The index of the soundcloud song in the songs array.
   */
  function resolveStreamable(url, index) {
    SC.get("/resolve/?url=" + url, function (sound) {
      /*
      If streamable we get the url and bind the client ID to the end
      so Amplitude can just stream the song normally. We then overwrite
      the url the user provided with the streamable URL.
      */
      if (sound.streamable) {
        _config2.default.songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

        /*
        If the user want's to use soundcloud art, we overwrite the
        cover_art_url with the soundcloud artwork url.
        */
        if (_config2.default.soundcloud_use_art) {
          _config2.default.songs[index].cover_art_url = sound.artwork_url;
        }

        /*
        Grab the extra metadata from soundcloud and bind it to the
        song.  The user can get this through the public function:
        getActiveSongMetadata
        */
        _config2.default.songs[index].soundcloud_data = sound;
      } else {
        /*
        If not streamable, then we print a message to the user stating
        that the song with name X and artist X is not streamable. This
        gets printed ONLY if they have debug turned on.
        */
        AmplitudeHelpers.writeDebugMessage(_config2.default.songs[index].name + " by " + _config2.default.songs[index].artist + " is not streamable by the Soundcloud API");
      }
      /*
      Increments the song ready counter.
      */
      _config2.default.soundcloud_songs_ready++;

      /*
      When all songs are accounted for, then amplitude is ready
      to rock and we set the rest of the config.
      */
      if (_config2.default.soundcloud_songs_ready == _config2.default.soundcloud_song_count) {
        _init2.default.setConfig(tempUserConfig);
      }
    });
  }

  /**
   * Determines if a given URL is a SoundCloud URL.
   *
   * @param {string} url - The URL to test if it's a SoundCloud URL.
   */
  function isSoundCloudURL(url) {
    var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    return url.match(soundcloud_regex);
  }

  /*
  Returns the publically accessible methods
  */
  return {
    loadSoundCloud: loadSoundCloud,
    resolveIndividualStreamableURL: resolveIndividualStreamableURL,
    isSoundCloudURL: isSoundCloudURL
  };
}();

/**
 * Imports the initializer
 * @module init/AmplitudeInitializer
 */
exports.default = SoundCloud;
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the Playback Speed Visual Elements Handler
 * @module visual/PlaybackSpeedElements
 */
var PlaybackSpeedElements = function () {
  /**
   * Sets all of the visual playback speed buttons to have the right class
   * to display the background image that represents the current playback
   * speed.
   *
   * @access public
   */
  function sync() {
    /*
    Gets all of the playback speed classes.
    */
    var playbackSpeedClasses = document.getElementsByClassName("amplitude-playback-speed");

    /*
    Iterates over all of the playback speed classes
    applying the right speed class for visual purposes.
    */
    for (var i = 0; i < playbackSpeedClasses.length; i++) {
      /*
      Removes all of the old playback speed classes.
      */
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-10");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-15");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-20");

      /*
      Switch the current playback speed and apply the appropriate
      speed class.
      */
      switch (_config2.default.playback_speed) {
        case 1:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-10");
          break;
        case 1.5:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-15");
          break;
        case 2:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-20");
          break;
      }
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = PlaybackSpeedElements;
module.exports = exports["default"];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the shuffle elements
 * @module visual/ShuffleElements
 */
var ShuffleElements = function () {
  /**
   * Syncs the global shuffle button visual state.
   *
   * @access public
   */
  function syncMain() {
    /*
    Gets the shuffle buttons.
    */
    var shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

    /*
    Iterate over all of the shuffle buttons.
    */
    for (var i = 0; i < shuffleButtons.length; i++) {
      /*
      Ensure the shuffle button doesn't belong to a playlist. We have
      a separate method for that.
      */
      if (shuffleButtons[i].getAttribute("data-amplitude-playlist") == null) {
        /*
        If the state of the player is shuffled on, true, then
        we add the 'amplitude-shuffle-on' class and remove the
        'amplitude-shuffle-off' class. If the player is not shuffled
        then we do the opposite.
        */
        if (_config2.default.shuffle_on) {
          shuffleButtons[i].classList.add("amplitude-shuffle-on");
          shuffleButtons[i].classList.remove("amplitude-shuffle-off");
        } else {
          shuffleButtons[i].classList.add("amplitude-shuffle-off");
          shuffleButtons[i].classList.remove("amplitude-shuffle-on");
        }
      }
    }
  }

  /**
   * Syncs the playlist shuffle button visual state.
   *
   * @access public
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function syncPlaylist(playlist) {
    /*
    Gets all of the shuffle buttons.
    */
    var shuffleButtons = document.querySelectorAll('.amplitude-shuffle[data-amplitude-playlist="' + playlist + '"]');

    /*
    Iterate over all of the shuffle buttons
    */
    for (var i = 0; i < shuffleButtons.length; i++) {
      /*
      If the state of the playlist is shuffled on, true, then
      we add the 'amplitude-shuffle-on' class and remove the
      'amplitude-shuffle-off' class. If the player is not shuffled
      then we do the opposite.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        shuffleButtons[i].classList.add("amplitude-shuffle-on");
        shuffleButtons[i].classList.remove("amplitude-shuffle-off");
      } else {
        shuffleButtons[i].classList.add("amplitude-shuffle-off");
        shuffleButtons[i].classList.remove("amplitude-shuffle-on");
      }
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    syncMain: syncMain,
    syncPlaylist: syncPlaylist
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ShuffleElements;
module.exports = exports["default"];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the syncing of the song played progress elements.
 *
 * @module visual/SongPlayedProgressElements
 */
var SongPlayedProgressElements = function () {
  /**
   * Syncs the song played progress bars. These are HTML5 progress elements.
   *
   * @access private
   * @param {number} songPlayedPercentage  	- The percentage of the song that has been played.
   */
  function sync(songPlayedPercentage) {
    syncGlobal(songPlayedPercentage);
    syncPlaylist(songPlayedPercentage);
    syncSong(songPlayedPercentage);
    syncSongInPlaylist(songPlayedPercentage);
  }

  /**
   * Sync how much has been played with a progress bar. This is the global progress bar.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncGlobal(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll(".amplitude-song-played-progress");

      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");
        var songIndex = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (playlist == null && songIndex == null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is the playlist progress bar.
   *
   * @access public
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncPlaylist(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var song = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (song == null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSong(percentage) {
    if (_config2.default.active_playlist == null) {
      /*
      Ensure that the song completion percentage is a number
      */
      if (!isNaN(percentage)) {
        /*
        Get all of the song progress bars
        */
        var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-song-index="' + _config2.default.active_index + '"]');

        for (var i = 0; i < songPlayedProgressBars.length; i++) {
          var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");

          if (playlist == null) {
            var max = songPlayedProgressBars[i].max;

            songPlayedProgressBars[i].value = percentage / 100 * max;
          }
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song in playlist.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSongInPlaylist(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

      /*
        Iterates over all of the song played progress elements
        and sets them accordingly.
      */
      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");
        var songIndex = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (playlist != null && songIndex != null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sets all of the song played progress bars to 0
   *
   * @access public
   */
  function resetElements() {
    var songPlayedProgressBars = document.getElementsByClassName("amplitude-song-played-progress");

    for (var i = 0; i < songPlayedProgressBars.length; i++) {
      songPlayedProgressBars[i].value = 0;
    }
  }

  return {
    sync: sync,
    resetElements: resetElements
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = SongPlayedProgressElements;
module.exports = exports["default"];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Imports the config module
                                                                                                                                                                                                                                                                               * @module config
                                                                                                                                                                                                                                                                               */


/**
 * AmplitudeJS Core Module
 * @module core/Core
 */


/**
 * AmplitudeJS SoundCloud Module
 * @module soundcloud/SoundCloud
 */


/**
 * Imports the utilities used by the main module.
 */
/**
 * AmplitudeJS Config State Module
 * @module utilities/ConfigState
 */


/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */


/**
 * AmplitudeJS Checks Module
 * @module utilities/Checks
 */


/**
 * AmplitudeJS Shuffler Module
 * @module utilities/Shuffler
 */


/**
 * AmplitudeJS Events Module
 * @module events/Events
 */


/**
 * AmplitudeJS FX Module
 * @module fx/Fx
 */


/**
 * AmplitudeJS Visualizations Module
 * @module fx/Visualizations
 */


/**
 * AmplitudeJS WaveForm Module
 * @module fx/WaveForm
 */


/**
 * AmplitudeJS Audio Navigation Module.
 * @module utilities/AudioNavigation
 */


/**
 * AmplitudeJS Callbacks Module
 * @module utilities/Callbacks
 */


/**
 * AmplitudeJS Playlists Initializer Module
 * @module init/Playlists
 */


/**
 * Imports the AmplitudeJS Shuffle Elements
 * @module visual/ShuffleElements
 */


/**
 * Imports the AmplitudeJS Mute Elements
 * @module visual/MuteElements
 */


/**
 * Imports the AmplitudeJS Volume Slider
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Time Elements
 * @module visual/TimeElements
 */


/**
 * Imports the AmplitudeJS Play/Pause Elements Module.
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS MetaData Elements Module.
 * @module visual/MetaDataElements
 */


/**
 * Imports the AmplitudeJS PlaybackSpeedElements Module.
 * @module visual/PlayBackSpeedElements
 */


/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _events = __webpack_require__(26);

var _events2 = _interopRequireDefault(_events);

var _fx = __webpack_require__(46);

var _fx2 = _interopRequireDefault(_fx);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _waveform = __webpack_require__(22);

var _waveform2 = _interopRequireDefault(_waveform);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _playlists = __webpack_require__(48);

var _playlists2 = _interopRequireDefault(_playlists);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Initializer Module. Helps with the handling of all of the
 * initialization for AmplitudeJS.
 *
 * @module init/Initializer
 */
var Initializer = function () {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json )
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function initialize(userConfig) {
    var ready = false;

    /*
    Reset the config on init so we have a clean slate. This is if the
    user has to re-init.
    */
    _configState2.default.resetConfig();

    /*
    Initialize event handlers on init. This will clear any old
    event handlers on the amplitude element and re-bind what is
    necessary.
    */
    _events2.default.initialize();

    /*
      Initialize the callbacks we listen to for the audio object.
    */
    _callbacks2.default.initialize();

    /*
    Initializes debugging right away so we can use it for the rest
    of the configuration.
    */
    _config2.default.debug = userConfig.debug != undefined ? userConfig.debug : false;

    /*
      Set default artwork, if specified.
    */
    setArt(userConfig);

    /*
    Checks to see if the user has songs defined.
    */
    if (userConfig.songs) {
      /*
      Checks to see if the user has some songs in the songs array.
      */
      if (userConfig.songs.length != 0) {
        /*
        Copies over the user defined songs. and prepares
        Amplitude for the rest of the configuration.
        */
        _config2.default.songs = userConfig.songs;
        /*
        Flag amplitude as ready.
        */
        ready = true;
      } else {
        _debug2.default.writeMessage("Please add some songs, to your songs object!");
      }
    } else {
      _debug2.default.writeMessage("Please provide a songs object for AmplitudeJS to run!");
    }

    /*
    Initializes the audio context. In this method it checks to see if the
    user wants to use visualizations or not before proceeding.
    */
    if (_fx2.default.webAudioAPIAvailable()) {
      if (_fx2.default.determineUsingAnyFX()) {
        /*
          Configure the Web Audio API If It's available.
        */
        _fx2.default.configureWebAudioAPI();

        /*
            Activates the audio context after an event for the user.
        */
        document.documentElement.addEventListener("mousedown", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        document.documentElement.addEventListener("keydown", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        document.documentElement.addEventListener("keyup", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        /*
            Set the user waveform settings if provided.
          */
        if (userConfig.waveforms != undefined && userConfig.waveforms.sample_rate != undefined) {
          _config2.default.waveforms.sample_rate = userConfig.waveforms.sample_rate;
        }

        /*
            Initialize the waveform.
          */
        _waveform2.default.init();

        /*
            If the user is registering visualizations on init,
            we set them right away.
          */
        if (userConfig.visualizations != undefined && userConfig.visualizations.length > 0) {
          /*
                  Iterate over all of the visualizations and
                  register them in our player.
                */
          for (var i = 0; i < userConfig.visualizations.length; i++) {
            _visualizations2.default.register(userConfig.visualizations[i].object, userConfig.visualizations[i].params);
          }
        }
      }
    } else {
      _debug2.default.writeMessage("The Web Audio API is not available on this platform. We are using your defined backups!");
    }

    /*
      Initialize default live settings
    */
    initializeDefaultLiveSettings();

    /*
      Initialize default song indexes
    */
    initializeDefaultSongIndexes();

    /*
    When the preliminary config is ready, we are ready to proceed.
    */
    if (ready) {
      /*
      Copies over the soundcloud information to the global config
      which will determine where we go from there.
      */
      _config2.default.soundcloud_client = userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : "";

      /*
      Checks if we want to use the art loaded from soundcloud.
      */
      _config2.default.soundcloud_use_art = userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : "";

      /*
      If the user provides a soundcloud client then we assume that
      there are URLs in their songs that will reference SoundCloud.
      We then copy over the user config they provided to the
      temp_user_config so we don't mess up the global or their configs
      and load the soundcloud information.
      */
      var tempUserConfig = {};

      /*
        If there's a soundcloud_client key set, we load the SoundCloud data
        for all of the songs in the array.
      */
      if (_config2.default.soundcloud_client != "") {
        tempUserConfig = userConfig;

        /*
        Load up SoundCloud for use with AmplitudeJS.
        */
        _soundcloud2.default.loadSoundCloud(tempUserConfig);
      } else {
        /*
        The user is not using Soundcloud with Amplitude at this point
        so we just finish the configuration with the users's preferences.
        */
        setConfig(userConfig);
      }
    }

    /*
    Debug out what was initialized with AmplitudeJS.
    */
    _debug2.default.writeMessage("Initialized With: ");
    _debug2.default.writeMessage(_config2.default);
  }

  /**
   * Rebinds all of the elements in the display.
   *
   * Public Accessor: Amplitude.rebindDisplay()
   * @access public
   */
  function rebindDisplay() {
    _events2.default.initialize();
    _metaDataElements2.default.displayMetaData();
  }

  /**
   * Finishes the initalization of the config. Takes all of the user defined
   * parameters and makes sure they override the defaults. The important
   * config information is assigned in the publicInit() function.
   *
   * This function can be called from 2 different locations:
   * 	1. Right away on init after the important settings are defined.
   *
   * 	2. After all of the Soundcloud URLs are resolved properly and
   *	 	soundcloud is configured.  We will need the proper URLs from Soundcloud
   * 		to stream through Amplitude so we get those right away before we
   * 		set the information and the active song
   *
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function setConfig(userConfig) {
    /*
      Checks if the user has any playlists defined. If they do
      we have to initialize the functionality for the playlists.
    */
    if (userConfig.playlists && countPlaylists(userConfig.playlists) > 0) {
      _playlists2.default.initialize(userConfig.playlists);
    }

    /*
    Check to see if the user entered a start song
    */
    if (userConfig.start_song != undefined && !userConfig.starting_playlist) {
      /*
      Ensure what has been entered is an integer.
      */
      if (_checks2.default.isInt(userConfig.start_song)) {
        _audioNavigation2.default.changeSong(_config2.default.songs[userConfig.start_song], userConfig.start_song);
      } else {
        _debug2.default.writeMessage("You must enter an integer index for the start song.");
      }
    } else {
      _audioNavigation2.default.changeSong(_config2.default.songs[0], 0);
    }

    /*
      If the shuffle is on by default, shuffle the songs and
      switch to the shuffled song.
    */
    if (userConfig.shuffle_on != undefined && userConfig.shuffle_on) {
      _config2.default.shuffle_on = true;
      _shuffler2.default.shuffleSongs();

      _audioNavigation2.default.changeSong(_config2.default.shuffle_list[0], 0);
    }

    /*
    Allows the user to set whether they want to continue to the next song
    when the current song finishes or not. In any scenario that's not a playlist,
    contining to the next song may not be desired.
    */
    _config2.default.continue_next = userConfig.continue_next != undefined ? userConfig.continue_next : true;

    /*
    If the user defined a playback speed, we copy over their
    preference here, otherwise we default to normal playback
    speed of 1.0.
    */
    _config2.default.playback_speed = userConfig.playback_speed != undefined ? userConfig.playback_speed : 1.0;

    /*
    Sets the audio playback speed.
    */
    _core2.default.setPlaybackSpeed(_config2.default.playback_speed);

    /*
    If the user wants the song to be pre-loaded for instant
    playback, they set it to true. By default it's set to just
    load the metadata.
    */
    _config2.default.audio.preload = userConfig.preload != undefined ? userConfig.preload : "auto";

    /*
    Initializes the user defined callbacks. This should be a JSON
    object that contains a key->value store of the callback name
    and the name of the function the user needs to call.
    */
    _config2.default.callbacks = userConfig.callbacks != undefined ? userConfig.callbacks : {};

    /*
    Initializes the user defined key bindings. This should be a JSON
    object that contains a key->value store of the key event number
    pressed and the method to be run.
    */
    _config2.default.bindings = userConfig.bindings != undefined ? userConfig.bindings : {};

    /*
    The user can define a starting volume in a range of 0-100 with
    0 being muted and 100 being the loudest. After the config is set
    Amplitude sets the active song's volume to the volume defined
    by the user.
    */
    _config2.default.volume = userConfig.volume != undefined ? userConfig.volume : 50;

    /*
    Sets the delay between songs if the user has it set. This should be in MS.
    */
    _config2.default.delay = userConfig.delay != undefined ? userConfig.delay : 0;

    /*
    The user can set the volume increment and decrement values between 1 and 100
    for when the volume up or down button is pressed.  The default is an increase
    or decrease of 5.
    */
    _config2.default.volume_increment = userConfig.volume_increment != undefined ? userConfig.volume_increment : 5;

    _config2.default.volume_decrement = userConfig.volume_decrement != undefined ? userConfig.volume_decrement : 5;

    /*
    Set the volume to what is defined in the config. The user can define this,
    so we should set it up that way.
    */
    _core2.default.setVolume(_config2.default.volume);

    /*
     Set default artwork, if specified
     */
    setArt(userConfig);

    /*
      Initialize the visual elements
    */
    initializeElements();

    /*
    If the user has selected a starting playlist, we need to set the starting playlist
    and sync the visuals
    */
    if (userConfig.starting_playlist != undefined && userConfig.starting_playlist != "") {
      /*
      Set the active playlist to the starting playlist by the user
      */
      _config2.default.active_playlist = userConfig.starting_playlist;

      /*
      Check if the user defined a song to start with in the playlist.
      */
      if (userConfig.starting_playlist_song != undefined && userConfig.starting_playlist_song != "") {
        /*
        Ensure the song is a valid index.
        */
        if (_typeof(userConfig.playlists[userConfig.starting_playlist].songs[parseInt(userConfig.starting_playlist_song)]) != undefined) {
          /*
          Set the player to the song defined by the user.
          */
          _audioNavigation2.default.changeSongPlaylist(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[parseInt(userConfig.starting_playlist_song)], parseInt(userConfig.starting_playlist_song));
        } else {
          /*
          Set the player to the first song in the playlist
          */
          _audioNavigation2.default.changeSongPlaylist(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[0], 0);
          /*
          Debug that the song index doesn't exist
          */
          _debug2.default.writeMessage("The index of " + userConfig.starting_playlist_song + " does not exist in the playlist " + userConfig.starting_playlist);
        }
      } else {
        /*
        Set the player to the first song in the playlist
        */
        _audioNavigation2.default.changeSong(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[0], 0);
      }

      /*
      Sync the main and song play pause buttons.
      */
      _playPauseElements2.default.sync();
    }

    /*
    Run after init callback
    */
    _callbacks2.default.run("initialized");
  }

  /**
   * Sets the default_album_art and default_playlist_art from the
   * user supplied configuration.
   *
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function setArt(userConfig) {
    /*
      If the user defines default album art, this image will display if the active
      song doesn't have album art defined.
    */
    if (userConfig.default_album_art != undefined) {
      _config2.default.default_album_art = userConfig.default_album_art;
    } else {
      _config2.default.default_album_art = "";
    }

    /*
    If the user defines default playlist art, this image will display if the user
    tries to set up a playlist meta data image tag but doesn't have one defined.
    */
    if (userConfig.default_playlist_art != undefined) {
      _config2.default.default_playlist_art = userConfig.default_playlist_art;
    } else {
      _config2.default.default_playlist_art = "";
    }
  }

  /**
   * Initializes all of the elements on the page to the default starting point
   * to build from there.
   *
   * @access private
   */
  function initializeElements() {
    /*
    Visually sync the shuffle statuses
    */
    _shuffleElements2.default.syncMain();

    /*
    Sync Mute Elements.
    */
    _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

    /*
    Sync Volume Slider Elements
    */
    _volumeSliderElements2.default.sync();

    /*
    Syncs all of the playback speed elements.
    */
    _playbackSpeedElements2.default.sync();

    /*
    Syncs all of the visual time elements to 00.
    */
    _timeElements2.default.resetCurrentTimes();

    /*
    Sets all of the play pause buttons to pause.
    */
    _playPauseElements2.default.syncToPause();

    /*
    Sets the meta data for the songs automatically.
    */
    _metaDataElements2.default.syncMetaData();

    /*
    Sets the repeat buttons automatically.
    */
    _repeatElements2.default.syncRepeatSong();
  }

  /**
   * Counts the number of playlists the user has configured. This ensures
   * that the user has at least 1 playlist so we can validate the songs
   * defined in the playlist are correct and they didn't enter an invalid
   * ID.
   *
   * @access private
   * @param {object} playlists 	-
   */
  function countPlaylists(playlists) {
    /*
    Initialize the placeholders to iterate through the playlists
    and find out how many we have to account for.
    */
    var size = 0,
        key = void 0;

    /*
    Iterate over playlists and if the user has the playlist defined,
    increment the size of playlists.
    */
    for (key in playlists) {
      if (playlists.hasOwnProperty(key)) {
        size++;
      }
    }

    /*
    Debug how many playlists are in the config.
    */
    _debug2.default.writeMessage("You have " + size + " playlist(s) in your config");

    /*
    Return the number of playlists in the config.
    */
    return size;
  }

  /**
   * Intializes the default live settings for all of the songs.
   *
   * @access private
   */
  function initializeDefaultLiveSettings() {
    for (var i = 0; i < _config2.default.songs.length; i++) {
      if (_config2.default.songs[i].live == undefined) {
        _config2.default.songs[i].live = false;
      }
    }
  }

  /**
   * Initializes the index of the song in the songs array so
   * we can reference it if needed
   *
   * @access private
   */
  function initializeDefaultSongIndexes() {
    for (var i = 0; i < _config2.default.songs.length; i++) {
      _config2.default.songs[i].index = i;
    }
  }

  /*
  Returns the publicly accessible methods
  */
  return {
    initialize: initialize,
    setConfig: setConfig,
    rebindDisplay: rebindDisplay
  };
}();

exports.default = Initializer;
module.exports = exports["default"];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds a waveform for the current audio.
 * Help from: https://robots.thoughtbot.com/javascript-audio-api
 * https://stackoverflow.com/questions/21347833/html-svg-not-drawing-works-in-other-pages
 */
var WaveForm = function () {
  /*
    Initialize the local variables used in the Waveform.
  */
  var buffer = "";
  var sampleRate = "";
  var peaks = "";

  function init() {
    sampleRate = _config2.default.waveforms.sample_rate;

    /*
      Grabs all of the waveform elements on the page.
    */
    var waveforms = document.querySelectorAll(".amplitude-wave-form");

    /*
      If there are waveforms, we iterate over them and set them up to display
      properly.
    */
    if (waveforms.length > 0) {
      /*
        Iterate over all of the waveforms and build the SVG parts.
      */
      for (var i = 0; i < waveforms.length; i++) {
        /*
          Clear the inner HTML of the element if we are replacing the waveform.
        */
        waveforms[i].innerHTML = "";

        /*
          Inserts an SVG into the element.
        */
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 -1 " + sampleRate + " 2");
        svg.setAttribute("preserveAspectRatio", "none");

        /*
          Add a g component to the SVG
        */
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(g);

        /*
          Add a path component to the g
        */
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "");
        path.setAttribute("id", "waveform");

        g.appendChild(path);

        /*
          Append the SVG to the waveform.
        */
        waveforms[i].appendChild(svg);
      }
    }
  }

  /**
   * Builds each waveform for the page.
   */
  function build() {
    if (_config2.default.web_audio_api_available) {
      /*
        If we don't have the wave form built, we need to build the waveform by loading
        the src with an array buffer.
      */
      if (_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))] == undefined) {
        /*
          Initializes a new XML Http Request.
        */
        var req = new XMLHttpRequest();

        /*
          Opens the src parameter for the audio file to read in.
        */
        req.open("GET", _config2.default.audio.src, true);
        req.responseType = "arraybuffer";

        /*
          When the ready state changes, check to see if we can render the
          wave form.
        */
        req.onreadystatechange = function (e) {
          /*
            When the request is complete, then we begin decoding the
            audio to build the waveform.
          */
          if (req.readyState == 4) {
            /*
              If the status is 200 means the response is a success and
              we decode the audio data.
            */
            if (req.status == 200) {
              /*
                Decode the audio data and process the waveform.
              */
              _config2.default.context.decodeAudioData(req.response, function (bufferedAudio) {
                /*
                  Set the buffer to the audio returned.
                */
                buffer = bufferedAudio;

                /*
                  Get the peaks in the audio.
                */
                peaks = getPeaks(sampleRate, buffer);

                /*
                  Build the SVG
                */
                process(sampleRate, buffer, peaks);
              });
            }
          }
        };
        req.send();
      } else {
        /*
          If we already have a waveform, we grab the waveform that
          was created for the song and display it. We do a simple hash
          of the song URL so it's already unique.
        */
        displayWaveForms(_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0))]);
      }
    }
  }

  /**
   * Processes the audio and generates the waveform.
   *
   * @param {sampleRate} sampleRate - The rate we should sample the audio.
   * @param {arraybuffer} buffer - The Web Audio API
   * @param {array} peaks - The peaks in the audio.
   */
  function process(sampleRate, buffer, peaks) {
    /*
      If we have a buffer, we find the peaks in the audio.
    */
    if (buffer) {
      /*
        Get the total peaks in the song.
      */
      var totalPeaks = peaks.length;

      /*
        Figure out the depth of the peak.
      */
      var d = "";
      for (var peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber % 2 === 0) {
          d += " M" + ~~(peakNumber / 2) + ", " + peaks.shift();
        } else {
          d += " L" + ~~(peakNumber / 2) + ", " + peaks.shift();
        }
      }

      /*
        Add the waveform to the built waveforms array.
      */
      _config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))] = d;

      /*
        Display the waveform.
      */
      displayWaveForms(_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))]);
    }
  }

  /**
   * Get the peaks of the audio for the waveform.
   *
   * @param {number} length - The sample size of the audio.
   * @param {array} buffer - The array buffer used to find the peaks in the audio.
   */
  function getPeaks(length, buffer) {
    /*
      Set the parameters needed to build the SVG.
    */
    var sampleSize = buffer.length / length;
    var sampleStep = ~~(sampleSize / 10) || 1;
    var numberOfChannels = buffer.numberOfChannels;
    var mergedPeaks = [];

    /*
      Iterate over the channels and find the peaks.
    */
    for (var channelNumber = 0; channelNumber < numberOfChannels; channelNumber++) {
      /*
        Initialize the peaks array and set the channel data to what
        the buffer has in its channel data.
      */
      var _peaks = [];
      var channelData = buffer.getChannelData(channelNumber);

      /*
        Iterate over peaks with respect to the sample size.
      */
      for (var peakNumber = 0; peakNumber < length; peakNumber++) {
        /*
          Gt the start and end peak.
        */
        var start = ~~(peakNumber * sampleSize);
        var end = ~~(start + sampleSize);

        /*
          Set min and max to the channel data first peak.
        */
        var min = channelData[0];
        var max = channelData[0];

        /*
          Iterate over the parts of the song starting to the
          ending to display the waveform.
        */
        for (var sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
          var value = channelData[sampleIndex];

          if (value > max) {
            max = value;
          }
          if (value < min) {
            min = value;
          }
        }

        /*
          Set the max and min for the peak.
        */
        _peaks[2 * peakNumber] = max;
        _peaks[2 * peakNumber + 1] = min;

        /*
          Merge the peaks
        */
        if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
          mergedPeaks[2 * peakNumber] = max;
        }

        if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
          mergedPeaks[2 * peakNumber + 1] = min;
        }
      }
    }

    /*
      Returns the merged peaks.
    */
    return mergedPeaks;
  }

  /**
   * Displays all of the waveforms necessary.
   *
   * @param {path} svg - The drawing of the waveform.
   */
  function displayWaveForms(svg) {
    var waveformElements = document.querySelectorAll(".amplitude-wave-form");

    /*
      Iterate over all of the waveform elements and
      display the waveform.
    */
    for (var i = 0; i < waveformElements.length; i++) {
      /*
        Get the playlist attribute of the waveform element.
      */
      var playlist = waveformElements[i].getAttribute("data-amplitude-playlist");

      /*
        Get the song index attribute of the waveform element.
      */
      var song = waveformElements[i].getAttribute("data-amplitude-song-index");

      /*
        If the playlist is null and the song is null it's a global element.
      */
      if (playlist == null && song == null) {
        displayGlobalWaveform(waveformElements[i], svg);
      }

      /*
        If the playlist is defined but the song is null it's a playlist element.
      */
      if (playlist != null && song == null) {
        displayPlaylistWaveform(waveformElements[i], svg, playlist);
      }

      /*
        If the playlist is not defined and the song is not null it's a song
        element.
      */
      if (playlist == null && song != null) {
        displaySongWaveform(waveformElements[i], svg, song);
      }

      /*
        If the playlist and song are defined it's a song in the playlist element.
      */
      if (playlist != null && song != null) {
        displaySongInPlaylistWaveform(waveformElements[i], svg, playlist, song);
      }
    }
  }

  /**
   * Displays a global wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   */
  function displayGlobalWaveform(element, svg) {
    var waveformPath = element.querySelector("svg g path");

    waveformPath.setAttribute("d", svg);
  }

  /**
   * Displays a playlist wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {string} playlist - The playlist we are displaying the waveform for.
   */
  function displayPlaylistWaveform(element, svg, playlist) {
    /*
      Ensure the playlist is the active playlist.
    */
    if (_config2.default.active_playlist == playlist) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {Integer} song - The index of the song we are displaying the
   * waveform for.
   */
  function displaySongWaveform(element, svg, song) {
    /*
      Ensure it's the active song being displayed.
    */
    if (_config2.default.active_index == song) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song in playlist waveform.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {String} playlist - The playlist the waveform is in.
   * @param {Integer} song - The index of the song we are displaying the waveform for.
   */
  function displaySongInPlaylistWaveform(element, svg, playlist, song) {
    /*
      Ensure it's the active song in the active playlist.
    */
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[_config2.default.active_playlist].active_index == song) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Determines if the user is using waveforms
   */
  function determineIfUsingWaveforms() {
    var waveforms = document.querySelectorAll(".amplitude-wave-form");

    if (waveforms.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
    Return the public methods.
  */
  return {
    init: init,
    build: build,
    determineIfUsingWaveforms: determineIfUsingWaveforms
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = WaveForm;
module.exports = exports["default"];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The utility to handle the computation of time in AmplitudeJS.
 * @module utilities/Time
 */
var Time = function () {
  /**
   * Computes the current song time. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeCurrentTimes() {
    /*
    Initialize the current time object that will be returned.
    */
    var currentTime = {};

    /*
    Computes the current seconds for the song.
    */
    var currentSeconds = (Math.floor(_config2.default.audio.currentTime % 60) < 10 ? "0" : "") + Math.floor(_config2.default.audio.currentTime % 60);

    /*
    Computes the current minutes for the song.
    */
    var currentMinutes = Math.floor(_config2.default.audio.currentTime / 60);

    /*
    Initialize the current hours variable.
    */
    var currentHours = "00";

    /*
    If the current minutes is less than 10, we add a leading 0.
    */
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }

    /*
    If the user is more than 60 minutes into the song, then
    we extract the hours.
    */
    if (currentMinutes >= 60) {
      currentHours = Math.floor(currentMinutes / 60);
      currentMinutes = currentMinutes % 60;

      /*
      If the user is less than 10 minutes in, we append the
      additional 0 to the minutes.
      */
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
    }

    /*
    Build a clean current time object and send back the appropriate information.
    */
    currentTime.seconds = currentSeconds;
    currentTime.minutes = currentMinutes;
    currentTime.hours = currentHours;

    return currentTime;
  }

  /**
   * Computes the current song duration. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeSongDuration() {
    /*
    Initialize the song duration object that will be returned.
    */
    var songDuration = {};

    /*
    Computes the duration of the song's seconds.
    */
    var songDurationSeconds = (Math.floor(_config2.default.audio.duration % 60) < 10 ? "0" : "") + Math.floor(_config2.default.audio.duration % 60);

    /*
    Computes the duration of the song's minutes.
    */
    var songDurationMinutes = Math.floor(_config2.default.audio.duration / 60);

    /*
    Initialize the hours duration variable.
    */
    var songDurationHours = "00";

    /*
    If the song duration minutes is less than 10, we add a leading 0.
    */
    if (songDurationMinutes < 10) {
      songDurationMinutes = "0" + songDurationMinutes;
    }

    /*
    If there is more than 60 minutes in the song, then we
    extract the hours.
    */
    if (songDurationMinutes >= 60) {
      songDurationHours = Math.floor(songDurationMinutes / 60);
      songDurationMinutes = songDurationMinutes % 60;

      /*
      If the song duration minutes is less than 10 we append
      the additional 0.
      */
      if (songDurationMinutes < 10) {
        songDurationMinutes = "0" + songDurationMinutes;
      }
    }

    /*
    Build a clean song duration object and send back the appropriate information.
    */
    songDuration.seconds = isNaN(songDurationSeconds) ? "00" : songDurationSeconds;
    songDuration.minutes = isNaN(songDurationMinutes) ? "00" : songDurationMinutes;
    songDuration.hours = isNaN(songDurationHours) ? "00" : songDurationHours.toString();

    return songDuration;
  }

  /**
   * Computes the song completion percentage.
   *
   * @access public
   */
  function computeSongCompletionPercentage() {
    return _config2.default.audio.currentTime / _config2.default.audio.duration * 100;
  }

  /**
   * Sets the current time for the audio.
   *
   * @access public
   */
  function setCurrentTime(time) {
    /*
      If the song is not live, we can set the current time.
    */
    if (!_config2.default.active_metadata.live) {
      /*
        Makes sure the number is finite to set the time.
      */
      if (isFinite(time)) {
        _config2.default.audio.currentTime = time;
      }
    }
  }

  /**
   * Defines what is returned by the module
   */
  return {
    computeCurrentTimes: computeCurrentTimes,
    computeSongDuration: computeSongDuration,
    computeSongCompletionPercentage: computeSongCompletionPercentage,
    setCurrentTime: setCurrentTime
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Time;
module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Visual Handler for Buffered Progress Elements
 *
 * @module visual/BufferedProgressElements
 */
var BufferedProgressElements = function () {
  /**
   * Syncs the buffered progress bars to the current percentage in the config
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Sync the global song buffered progress elements.
   */
  function syncGlobal() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBars.length; i++) {
      var playlist = songBufferedProgressBars[i].getAttribute("data-amplitude-playlist");
      var song = songBufferedProgressBars[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && song == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBars[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the playlist song buffered progress elements.
   */
  function syncPlaylist() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsPlaylist = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsPlaylist.length; i++) {
      var song = songBufferedProgressBarsPlaylist[i].getAttribute("data-amplitude-song-index");

      if (song == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsPlaylist[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the song song buffered progress elements.
   */
  function syncSong() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsSongs = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="' + _config2.default.active_index + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsSongs.length; i++) {
      var playlist = songBufferedProgressBarsSongs[i].getAttribute("data-amplitude-playlist");

      if (playlist == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsSongs[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the song in playlist song buffered progress elements.
   */
  function syncSongInPlaylist() {
    var activePlaylistIndex = _config2.default.active_playlist != null && _config2.default.active_playlist != "" ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsSongsInPlaylist = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsSongsInPlaylist.length; i++) {
      if (!isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsSongsInPlaylist[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sets all of the song buffered progress bars to 0
   *
   * @access public
   */
  function reset() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBars.length; i++) {
      songBufferedProgressBars[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    reset: reset
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = BufferedProgressElements;
module.exports = exports["default"];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Ended Module. Handles the ended event on the audio.
 *
 * @module events/Ended
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Ended = function () {
  /**
   * When the song has ended, handles what to do next
   *
   * HANDLER FOR: ended
   *
   * @access public
   */
  function handle() {
    /*
      Sets the time out for song ended. This determines if
      we should go to the next song or delay between songs.
    */
    setTimeout(function () {
      /*
        If we continue next, we should move to the next song in the playlist.
      */
      if (_config2.default.continue_next) {
        /*
        If the active playlist is not set, we set the
        next song that's in the songs array.
        */
        if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
          _audioNavigation2.default.setNext(true);
        } else {
          _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist, true);
        }
      } else {
        if (!_config2.default.is_touch_moving) {
          /*
          Stops the active song.
          */
          _core2.default.stop();

          /*
            Sync the play pause elements.
          */
          _playPauseElements2.default.sync();
        }
      }
    }, _config2.default.delay);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
exports.default = Ended;
module.exports = exports["default"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _keydown = __webpack_require__(27);

var _keydown2 = _interopRequireDefault(_keydown);

var _timeUpdate = __webpack_require__(42);

var _timeUpdate2 = _interopRequireDefault(_timeUpdate);

var _ended = __webpack_require__(25);

var _ended2 = _interopRequireDefault(_ended);

var _progress = __webpack_require__(35);

var _progress2 = _interopRequireDefault(_progress);

var _play = __webpack_require__(31);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(30);

var _pause2 = _interopRequireDefault(_pause);

var _playPause = __webpack_require__(32);

var _playPause2 = _interopRequireDefault(_playPause);

var _stop = __webpack_require__(41);

var _stop2 = _interopRequireDefault(_stop);

var _mute = __webpack_require__(28);

var _mute2 = _interopRequireDefault(_mute);

var _volumeUp = __webpack_require__(45);

var _volumeUp2 = _interopRequireDefault(_volumeUp);

var _volumeDown = __webpack_require__(43);

var _volumeDown2 = _interopRequireDefault(_volumeDown);

var _songSlider = __webpack_require__(40);

var _songSlider2 = _interopRequireDefault(_songSlider);

var _volumeSlider = __webpack_require__(44);

var _volumeSlider2 = _interopRequireDefault(_volumeSlider);

var _next = __webpack_require__(29);

var _next2 = _interopRequireDefault(_next);

var _prev = __webpack_require__(34);

var _prev2 = _interopRequireDefault(_prev);

var _repeat = __webpack_require__(36);

var _repeat2 = _interopRequireDefault(_repeat);

var _repeatSong = __webpack_require__(37);

var _repeatSong2 = _interopRequireDefault(_repeatSong);

var _playbackSpeed = __webpack_require__(33);

var _playbackSpeed2 = _interopRequireDefault(_playbackSpeed);

var _shuffle = __webpack_require__(38);

var _shuffle2 = _interopRequireDefault(_shuffle);

var _skipTo = __webpack_require__(39);

var _skipTo2 = _interopRequireDefault(_skipTo);

var _waveform = __webpack_require__(22);

var _waveform2 = _interopRequireDefault(_waveform);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Events Module. Handles all of the events we listen to in
 * AmplitudeJS.
 *
 * @module events/Events
 */


/**
 * Imports all of the handler objects used by the events.
 */
var Events = function () {
  /**
   * Initializes the handlers for the events listened to by Amplitude
   *
   * @access public
   */
  function initialize() {
    /*
    Write out debug message
    */
    _debug2.default.writeMessage("Beginning initialization of event handlers..");

    /*
    Sets flag that the screen is moving and not a tap
    */
    document.addEventListener("touchmove", function () {
      _config2.default.is_touch_moving = true;
    });

    /*
    On touch end if it was a touch move event, set moving to
    false
    */
    document.addEventListener("touchend", function () {
      if (_config2.default.is_touch_moving) {
        _config2.default.is_touch_moving = false;
      }
    });

    /*
    On time update for the audio element, update visual displays that
    represent the time on either a visualized element or time display.
    */
    bindTimeUpdate();

    /*
    Binds key down event handlers for matching key codes to functions.
    */
    bindKeyDownEventHandlers();

    /*
    When the audio element has ended playing, we handle the song
    ending. In a single song or multiple modular song instance,
    this just synchronizes the visuals for time and song time
    visualization, but for a playlist it determines whether
    it should play the next song or not.
    */
    bindSongEnded();

    /*
    Binds progress event so we can see how much of the song is loaded.
    */
    bindProgress();

    /*
    Binds 'amplitude-play' event handlers
    */
    bindPlay();

    /*
    Binds 'amplitude-pause' event handlers.
    */
    bindPause();

    /*
    Binds 'amplitude-play-pause' event handlers.
    */
    bindPlayPause();

    /*
    Binds 'amplitude-stop' event handlers.
    */
    bindStop();

    /*
    Binds 'amplitude-mute' event handlers.
    */
    bindMute();

    /*
    Binds 'amplitude-volume-up' event handlers
    */
    bindVolumeUp();

    /*
    Binds 'amplitude-volume-down' event handlers
    */
    bindVolumeDown();

    /*
    Binds 'amplitude-song-slider' event handlers
    */
    bindSongSlider();

    /*
    Binds 'amplitude-volume-slider' event handlers.
    */
    bindVolumeSlider();

    /*
    Binds 'amplitude-next' event handlers.
    */
    bindNext();

    /*
    Binds 'amplitude-prev' event handlers.
    */
    bindPrev();

    /*
    Binds 'amplitude-shuffle' event handlers.
    */
    bindShuffle();

    /*
    Binds 'amplitude-repeat' event handlers.
    */
    bindRepeat();

    /*
    Binds 'amplitude-repeat-song' event handlers.
    */
    bindRepeatSong();

    /*
    Binds 'amplitude-playback-speed' event handlers.
    */
    bindPlaybackSpeed();

    /*
    Binds 'amplitude-skip-to' event handlers.
    */
    bindSkipTo();

    /*
    Binds `canplaythrough` event to build the waveform.
    */
    bindCanPlayThrough();
  }

  /**
   * On time update for the audio element, update visual displays that
   * represent the time on either a visualized element or time display.
   *
   * @access private
   */
  function bindTimeUpdate() {
    /*
    Bind for time update
    */
    _config2.default.audio.removeEventListener("timeupdate", _timeUpdate2.default.handle);
    _config2.default.audio.addEventListener("timeupdate", _timeUpdate2.default.handle);

    /*
    Bind for duration change
    */
    _config2.default.audio.removeEventListener("durationchange", _timeUpdate2.default.handle);
    _config2.default.audio.addEventListener("durationchange", _timeUpdate2.default.handle);
  }

  /**
   * On keydown, we listen to what key got pressed so we can map the key to
   * a function. This allows the user to map pause and play, next, etc. to key
   * presses.
   *
   * @access private
   */
  function bindKeyDownEventHandlers() {
    document.removeEventListener("keydown", _keydown2.default.handle);
    document.addEventListener("keydown", _keydown2.default.handle);
  }

  /**
   * When the audio element has ended playing, we handle the song
   * ending. In a single song or multiple modular song instance,
   * this just synchronizes the visuals for time and song time
   * visualization, but for a playlist it determines whether
   * it should play the next song or not.
   *
   * @access private
   */
  function bindSongEnded() {
    _config2.default.audio.removeEventListener("ended", _ended2.default.handle);
    _config2.default.audio.addEventListener("ended", _ended2.default.handle);
  }

  /**
   * As the audio is loaded, the progress event gets fired. We bind into this
   * to grab the buffered percentage of the song. We can then add more elements
   * to show the buffered amount.
   *
   * @access private
   */
  function bindProgress() {
    _config2.default.audio.removeEventListener("progress", _progress2.default.handle);
    _config2.default.audio.addEventListener("progress", _progress2.default.handle);
  }

  /**
   * Binds click and touchend events for AmplitudeJS play buttons
   *
   * @access private
   */
  function bindPlay() {
    /*
    Gets all of the elements with the class amplitude-play
    */
    var play_classes = document.getElementsByClassName("amplitude-play");

    /*
    Iterates over all of the play classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < play_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        play_classes[i].removeEventListener("touchend", _play2.default.handle);
        play_classes[i].addEventListener("touchend", _play2.default.handle);
      } else {
        play_classes[i].removeEventListener("click", _play2.default.handle);
        play_classes[i].addEventListener("click", _play2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS pause buttons.
   *
   * @access private
   */
  function bindPause() {
    /*
    Gets all of the elements with the class amplitude-pause
    */
    var pause_classes = document.getElementsByClassName("amplitude-pause");

    /*
    Iterates over all of the pause classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < pause_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        pause_classes[i].removeEventListener("touchend", _pause2.default.handle);
        pause_classes[i].addEventListener("touchend", _pause2.default.handle);
      } else {
        pause_classes[i].removeEventListener("click", _pause2.default.handle);
        pause_classes[i].addEventListener("click", _pause2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS play pause buttons
   *
   * @access private
   */
  function bindPlayPause() {
    /*
    Gets all of the elements with the class amplitude-play-pause
    */
    var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

    /*
    Iterates over all of the play/pause classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < play_pause_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        play_pause_classes[i].removeEventListener("touchend", _playPause2.default.handle);
        play_pause_classes[i].addEventListener("touchend", _playPause2.default.handle);
      } else {
        play_pause_classes[i].removeEventListener("click", _playPause2.default.handle);
        play_pause_classes[i].addEventListener("click", _playPause2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS stop buttons
   *
   * @access private
   */
  function bindStop() {
    /*
    Gets all of the elements with the class amplitude-stop
    */
    var stop_classes = document.getElementsByClassName("amplitude-stop");

    /*
    Iterates over all of the stop classes and binds the event interaction
    method to the element.  If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < stop_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        stop_classes[i].removeEventListener("touchend", _stop2.default.handle);
        stop_classes[i].addEventListener("touchend", _stop2.default.handle);
      } else {
        stop_classes[i].removeEventListener("click", _stop2.default.handle);
        stop_classes[i].addEventListener("click", _stop2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS mute buttons
   *
   * @access private
   */
  function bindMute() {
    /*
    Gets all of the elements with the class amplitue-mute
    */
    var mute_classes = document.getElementsByClassName("amplitude-mute");

    /*
    Iterates over all of the mute classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < mute_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          mute_classes[i].removeEventListener("touchend", _mute2.default.handle);
          mute_classes[i].addEventListener("touchend", _mute2.default.handle);
        }
      } else {
        mute_classes[i].removeEventListener("click", _mute2.default.handle);
        mute_classes[i].addEventListener("click", _mute2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Up Buttons
   *
   * @access private
   */
  function bindVolumeUp() {
    /*
    Gets all of the elements with the class amplitude-volume-up
    */
    var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

    /*
    Iterates over all of the volume up classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < volume_up_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          volume_up_classes[i].removeEventListener("touchend", _volumeUp2.default.handle);
          volume_up_classes[i].addEventListener("touchend", _volumeUp2.default.handle);
        }
      } else {
        volume_up_classes[i].removeEventListener("click", _volumeUp2.default.handle);
        volume_up_classes[i].addEventListener("click", _volumeUp2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Down Buttons
   *
   * @access private
   */
  function bindVolumeDown() {
    /*
    Gets all of the elements with the class amplitude-volume-down
    */
    var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");

    /*
    Iterates over all of the volume down classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < volume_down_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          volume_down_classes[i].removeEventListener("touchend", _volumeDown2.default.handle);
          volume_down_classes[i].addEventListener("touchend", _volumeDown2.default.handle);
        }
      } else {
        volume_down_classes[i].removeEventListener("click", _volumeDown2.default.handle);
        volume_down_classes[i].addEventListener("click", _volumeDown2.default.handle);
      }
    }
  }

  /**
   * Binds change and input events for AmplitudeJS Song Slider Inputs
   *
   * @access private
   */
  function bindSongSlider() {
    /*
    Gets browser so if we need to apply overrides, like we usually
    have to do for anything cool in IE, we can do that.
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
    Gets all of the elements with the class amplitude-song-slider
    */
    var song_sliders = document.getElementsByClassName("amplitude-song-slider");

    /*
    Iterates over all of the song slider classes and binds the event interaction
    methods to the element. If the browser is IE we listen to the change event
    where if it is anything else, it's the input method.
    */
    for (var i = 0; i < song_sliders.length; i++) {
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        song_sliders[i].removeEventListener("change", _songSlider2.default.handle);
        song_sliders[i].addEventListener("change", _songSlider2.default.handle);
      } else {
        song_sliders[i].removeEventListener("input", _songSlider2.default.handle);
        song_sliders[i].addEventListener("input", _songSlider2.default.handle);
      }
    }
  }

  /**
   * Binds change and input events fro AmplitudeJS Volume Slider inputs
   *
   * @access private
   */
  function bindVolumeSlider() {
    /*
    Gets browser so if we need to apply overrides, like we usually
    have to do for anything cool in IE, we can do that.
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
    Gets all of the elements with the class amplitude-volume-slider
        */
    var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

    /*
    Iterates over all of the volume slider classes and binds the event interaction
    methods to the element. If the browser is IE we listen to the change event
    where if it is anything else, it's the input method.
    */
    for (var i = 0; i < volume_sliders.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
      } else {
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          volume_sliders[i].removeEventListener("change", _volumeSlider2.default.handle);
          volume_sliders[i].addEventListener("change", _volumeSlider2.default.handle);
        } else {
          volume_sliders[i].removeEventListener("input", _volumeSlider2.default.handle);
          volume_sliders[i].addEventListener("input", _volumeSlider2.default.handle);
        }
      }
    }
  }

  /**
   * Binds click and touchend events fro AmplitudeJS Next buttons
   *
   * @access private
   */
  function bindNext() {
    /*
    Gets all of the elements with the class amplitude-next
        */
    var next_classes = document.getElementsByClassName("amplitude-next");

    /*
    Iterates over all of the next classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < next_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        next_classes[i].removeEventListener("touchend", _next2.default.handle);
        next_classes[i].addEventListener("touchend", _next2.default.handle);
      } else {
        next_classes[i].removeEventListener("click", _next2.default.handle);
        next_classes[i].addEventListener("click", _next2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS prev buttons.
   *
   * @access private
   */
  function bindPrev() {
    /*
    Gets all of the elements with the class amplitude-prev
    */
    var prev_classes = document.getElementsByClassName("amplitude-prev");

    /*
    Iterates over all of the prev classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < prev_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        prev_classes[i].removeEventListener("touchend", _prev2.default.handle);
        prev_classes[i].addEventListener("touchend", _prev2.default.handle);
      } else {
        prev_classes[i].removeEventListener("click", _prev2.default.handle);
        prev_classes[i].addEventListener("click", _prev2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS shuffle buttons.
   *
   * @access private
   */
  function bindShuffle() {
    /*
    Gets all of the elements with the class amplitude-shuffle
    */
    var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

    /*
    Iterates over all of the shuffle classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < shuffle_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the shuffle control.
      */
      shuffle_classes[i].classList.remove("amplitude-shuffle-on");
      shuffle_classes[i].classList.add("amplitude-shuffle-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        shuffle_classes[i].removeEventListener("touchend", _shuffle2.default.handle);
        shuffle_classes[i].addEventListener("touchend", _shuffle2.default.handle);
      } else {
        shuffle_classes[i].removeEventListener("click", _shuffle2.default.handle);
        shuffle_classes[i].addEventListener("click", _shuffle2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat buttons.
   *
   * @access private
   */
  function bindRepeat() {
    /*
    Gets all of the elements with the class amplitude-repeat
    */
    var repeat_classes = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterates over all of the repeat classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < repeat_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the repeat control.
      */
      repeat_classes[i].classList.remove("amplitude-repeat-on");
      repeat_classes[i].classList.add("amplitude-repeat-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        repeat_classes[i].removeEventListener("touchend", _repeat2.default.handle);
        repeat_classes[i].addEventListener("touchend", _repeat2.default.handle);
      } else {
        repeat_classes[i].removeEventListener("click", _repeat2.default.handle);
        repeat_classes[i].addEventListener("click", _repeat2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat song buttons.
   *
   * @access private
   */
  function bindRepeatSong() {
    /*
    Gets all of the elements with the class amplitude-repeat-song
    */
    var repeat_song_classes = document.getElementsByClassName("amplitude-repeat-song");

    /*
    Iterates over all of the repeat song classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < repeat_song_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the repeat control.
      */
      repeat_song_classes[i].classList.remove("amplitude-repeat-on");
      repeat_song_classes[i].classList.add("amplitude-repeat-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        repeat_song_classes[i].removeEventListener("touchend", _repeatSong2.default.handle);
        repeat_song_classes[i].addEventListener("touchend", _repeatSong2.default.handle);
      } else {
        repeat_song_classes[i].removeEventListener("click", _repeatSong2.default.handle);
        repeat_song_classes[i].addEventListener("click", _repeatSong2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS playback speed buttons
   *
   * @access private
   */
  function bindPlaybackSpeed() {
    /*
    Gets all of the elements with the class amplitude-playback-speed
    */
    var playback_speed_classes = document.getElementsByClassName("amplitude-playback-speed");

    /*
    Iterates over all of the playback speed classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < playback_speed_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        playback_speed_classes[i].removeEventListener("touchend", _playbackSpeed2.default.handle);
        playback_speed_classes[i].addEventListener("touchend", _playbackSpeed2.default.handle);
      } else {
        playback_speed_classes[i].removeEventListener("click", _playbackSpeed2.default.handle);
        playback_speed_classes[i].addEventListener("click", _playbackSpeed2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS skip to buttons.
   *
   * @access private
   */
  function bindSkipTo() {
    /*
    Gets all of the skip to elements with the class 'amplitude-skip-to'
    */
    var skipToClasses = document.getElementsByClassName("amplitude-skip-to");

    /*
    Iterates over all of the skip to classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it's a click.
    */
    for (var i = 0; i < skipToClasses.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        skipToClasses[i].removeEventListener("touchend", _skipTo2.default.handle);
        skipToClasses[i].addEventListener("touchend", _skipTo2.default.handle);
      } else {
        skipToClasses[i].removeEventListener("click", _skipTo2.default.handle);
        skipToClasses[i].addEventListener("click", _skipTo2.default.handle);
      }
    }
  }

  /**
   * Binds can play through to a song.
   *
   * @access private
   */
  function bindCanPlayThrough() {
    if (_waveform2.default.determineIfUsingWaveforms()) {
      _config2.default.audio.removeEventListener("canplaythrough", _waveform2.default.build);
      _config2.default.audio.addEventListener("canplaythrough", _waveform2.default.build);
    }
  }

  /*
  Returns the public facing functions.
  */
  return {
    initialize: initialize
  };
}();

/**
 * Imports the utility classes used by the evnets.
 */
/*
	Import the necessary classes and config to use
	with the events.
*/
exports.default = Events;
module.exports = exports["default"];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Key Down event handler
 *
 * @module events/KeyDown
 */


/**
 * Imports the Repeat Elements Visual Handler
 * @module visual/RepeatElements
 */


/**
 * Imports the Repeater Utility
 * @module utilities/Repeater
 */


/**
 * Imports the core of AmplitudeJS
 * @module core/Core
 */
var KeyDown = function () {
  /**
   * When the keydown event is fired, we determine which function should be run
   * based on what was passed in.
   *
   * HANDLER FOR: keydown
   *
   * @access public
   * @prop {object} event The event object being passed in.
   */
  function handle(event) {
    runKeyEvent(event.which);
  }

  /**
   * Runs an event on key down
   *
   * @access public
   * @param {number} key 	- The key code the event is bound to.
   */
  function runKeyEvent(key) {
    /*
    Checks to see if the user bound an event to the code pressed.
    */
    if (_config2.default.bindings[key] != undefined) {
      /*
      Determine which event should be run if bound.
      */
      switch (_config2.default.bindings[key]) {
        /*
        Fires a play pause event.
        */
        case "play_pause":
          runPlayPauseKeyDownEvent();
          break;

        /*
        Fires a next event.
        */
        case "next":
          runNextKeyDownEvent();
          break;

        /*
        Fires a previous event.
        */
        case "prev":
          runPrevKeyDownEvent();
          break;

        /*
        Fires a stop event.
        */
        case "stop":
          runStopKeyDownEvent();
          break;

        /*
        Fires a shuffle event.
        */
        case "shuffle":
          runShuffleKeyDownEvent();
          break;

        /*
        Fires a repeat event.
        */
        case "repeat":
          runRepeatKeyDownEvent();
          break;
      }
    }
  }

  /**
   * Runs the play pause method for key down.
   */
  function runPlayPauseKeyDownEvent() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Runs the next method for key down.
   */
  function runNextKeyDownEvent() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setNext();
    } else {
      _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Runs the previous method for key down.
   */
  function runPrevKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setPrevious();
    } else {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Runs the stop method for key down.
   */
  function runStopKeyDownEvent() {
    /*
      Syncs all of the play pause elements to pause.
    */
    _playPauseElements2.default.syncToPause();

    /*
      Stops the active song.
    */
    _core2.default.stop();
  }

  /**
   * Runs the shuffle method for key down.
   */
  function runShuffleKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _shuffler2.default.toggleShuffle();
    } else {
      _shuffler2.default.toggleShufflePlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Run the repeat method for key down.
   */
  function runRepeatKeyDownEvent() {
    /*
      Toggles the repeat
    */
    _repeater2.default.setRepeat(!_config2.default.repeat);

    /*
      Visually sync repeat
    */
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Returns the public methods for the handler.
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the Play Pause Elements Visual Handler
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the Shuffle Utility
 * @module utilities/Shuffle
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = KeyDown;
module.exports = exports["default"];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a mute event.
 * @module events/Mute
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var Mute = function () {
  /**
   * Handles an event for a mute element
   *
   * HANDLER FOR:       class="amplitude-mute"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      If the current volume in the config is 0, we set the volume to the
      pre_mute level.  This means that the audio is already muted and
      needs to be restored to the pre_mute level.
      Otherwise, we set pre_mute volume to the current volume
      and set the config volume to 0, muting the audio.
      */
      if (_config2.default.volume == 0) {
        _core2.default.setVolume(_config2.default.pre_mute_volume);
      } else {
        _config2.default.pre_mute_volume = _config2.default.volume;
        _core2.default.setVolume(0);
      }

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
      Syncs the volume sliders so the visuals align up with the functionality.
      If the volume is at 0, then the sliders should represent that so the user
      has the right starting point.
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = Mute;
module.exports = exports["default"];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Next Event Handler
 *
 * @module events/Next
 */


/**
 * Imports the Amplitude Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the Play Pause Elements Module.
 * @module visual/PlayPauseElements
 */
/**
 * Imports the config module
 * @module config
 */
var Next = function () {
  /**
   * Handles an event on the next button
   *
   * HANDLER FOR:       class="amplitude-next"
   *
   * GLOBAL:            class="amplitude-next"
   * PLAYLIST:          class="amplitude-next" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global next.
      */
      if (playlist == null) {
        handleGlobalNext();
      }

      /*
        If the playlist is set, we handle the playlist next.
      */
      if (playlist != null) {
        handlePlaylistNext(playlist);
      }
    }
  }

  /**
   * Handles an event on a global enxt button.
   *
   * @access private
   */
  function handleGlobalNext() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set next on the playlist.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setNext();
    } else {
      _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Handles an event on a next playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the next for.
   */
  function handlePlaylistNext(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == _config2.default.active_playlist) {
      _audioNavigation2.default.setNextPlaylist(playlist);
    } else {
      _debug2.default.writeMessage("You can not go to the next song on a playlist that is not being played!");
    }
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */


/**
 * Imports the Callbacks Module
 * @module utilities/Callbacks
 */


/**
 * Imports the AmplitudeJS Core module.
 * @module core/core
 */
exports.default = Next;
module.exports = exports["default"];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the pause events
 * @module events/Pause
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Pause = function () {
  /**
   * Handles an event on a pause button
   *
   * HANDLER FOR:       class="amplitude-pause"
   *
   * GLOBAL:            class="amplitude-pause"
   * PLAYLIST:          class="amplitude-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the attribute for song index so we can check if
        there is a need to change the song.  In some scenarios
        there might be multiple pause classes on the page. In that
        case it is possible the user could click a different pause
        class.
      */
      var songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      var playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global pause button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPause();
      }

      /*
        Handle a playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPause(playlistAttribute);
      }

      /*
        Handle a song pause button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPause(songIndexAttribute);
      }

      /*
        Handle a song in playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPause(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global pause button which pauses whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPause() {
    /*
      Pauses the song.
    */
    _core2.default.pause();

    /*
      Sync the play pause elements.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   */
  function handlePlaylistPause(playlist) {
    /*
      Checks to see if the active playlist is the same
    */
    if (_config2.default.active_playlist == playlist) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /**
   * Handles the song pause.
   *
   * @access private
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongPause(song) {
    /*
      Checks to see if the active playlist is null and the song matches
      the active index.
    */
    if ((_config2.default.active_playlist == "" || _config2.default.active_playlist == null) && _config2.default.active_index == song) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /**
   * Handles the song in playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongInPlaylistPause(playlist, song) {
    /*
      Checks to see if the active song matches the song and the
      active playlist matches the playlist. This means the pause button is
      for the song in the playlist.
    */
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[playlist].active_index == song) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the ConfigState module.
 * @module utilities/ConfigState
 */
exports.default = Pause;
module.exports = exports["default"];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the play events
 * @module events/Play
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Play = function () {
  /**
   * Handles an event on a play button in Amplitude.
   *
   * HANDLER FOR:       class="amplitude-play"
   *
   * GLOBAL:            class="amplitude-play"
   * PLAYLIST:          class="amplitude-play" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the attribute for song index so we can check if
        there is a need to change the song.  In some scenarios
        there might be multiple play classes on the page. In that
        case it is possible the user could click a different play
        class and change the song.
      */
      var songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      var playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global play button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPlay();
      }

      /*
        Handle a playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPlay(playlistAttribute);
      }

      /*
        Handle a song play button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPlay(songIndexAttribute);
      }

      /*
        Handle a song in playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPlay(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global play button which plays whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPlay() {
    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Sync the play pause elements.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handle the playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   */
  function handlePlaylistPlay(playlist) {
    /*
      Checks if we have a new playlist.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        Sets the active playlist to what belongs to the playlist.
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
        Play first song in the playlist since we just
        switched playlists, we start from the first song.
         If the user has shuffle on for the playlist, then
        we go from the first song in the shuffle playlist array.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].shuffle_list[0], 0);
      } else {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[0], 0);
      }
    }

    /*
      Plays the song.
    */
    _core2.default.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the song play button.
   *
   * @access private
   * @param {integer} song The index of the song we are playing.
   */
  function handleSongPlay(song) {
    /*
      There can be multiple playlists on the page and there can be
      multiple songs on the page AND there can be songs in multiple
      playlists, so we have some checking to do.
    */

    /*
      Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(null)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(null);

      /*
        We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song);
    }

    /*
      Check to see if the song has changed. If it has,
      set the active song. If it was in a playlist, the
      song wouldn't change here, since we already set the
      song when we checked for a playlist.
    */
    if (_checks2.default.newSong(null, song)) {
      /*
        The song selected is different, so we change the
        song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song);
    }

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the song in playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   * @param {integer} song The song the play button belongs to.
   */
  function handleSongInPlaylistPlay(playlist, song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(playlist, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song);
    }

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Imports the config state utility.
 * @module utilities/ConfigState
 */
exports.default = Play;
module.exports = exports["default"];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the play pause events
 * @module events/PlayPause
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var PlayPause = function () {
  /**
   * Handles an event on a play/pause button
   *
   * HANDLER FOR:       class="amplitude-play-pause"
   *
   * GLOBAL:            class="amplitude-play-pause"
   * PLAYLIST:          class="amplitude-play-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Get the playlist and song from the element. It's alright if these
        are null.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");
      var song = this.getAttribute("data-amplitude-song-index");

      /*
        Handle a global play pause button
      */
      if (playlist == null && song == null) {
        handleGlobalPlayPause();
      }

      /*
        Handle a playlist play pause button
      */
      if (playlist != null && song == null) {
        handlePlaylistPlayPause(playlist);
      }

      /*
        Handle a song play pause button
      */
      if (playlist == null && song != null) {
        handleSongPlayPause(song);
      }

      /*
        Handle a song in playlist play pause button
      */
      if (playlist != null && song != null) {
        handleSongInPlaylistPlayPause(playlist, song);
      }
    }
  }

  /**
   * Sets the main play pause buttons to the current state of the song.
   * @access private
   */
  function handleGlobalPlayPause() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} playlist The playlist the main play pause button controls
   */
  function handlePlaylistPlayPause(playlist) {
    /*
      The only thing that can change when you click a playlist
      play pause is the playlist. Main play pauses have no change
      in song, song play pauses can change playlist and song.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        If there's a new playlist, then we set the new playlist.
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
        Play first song in the playlist since we just
        switched playlists, we start from the first song.
         If the user has shuffle on for the playlist, then
        we go from the first song in the shuffle playlist array.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].shuffle_list[0], 0, true);
      } else {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[0], 0);
      }
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} song The index of the song being played/paused
   */
  function handleSongPlayPause(song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(null)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(null);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song, true);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(null, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song, true);
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the song in playlist play pause buttons to the current
   * state of the song.
   * @access private
   * @param {string} playlist The playlist the song is a part of
   * @param {number} song The index of the song being played/paused
   */
  function handleSongInPlaylistPlayPause(playlist, song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song, true);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(playlist, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song, true);
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Import the config state utility.
 * @module utilities/configState
 */
exports.default = PlayPause;
module.exports = exports["default"];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Playback Speed Event Handler
 *
 * @module events/PlaybackSpeed
 */


/**
 * Imports the Amplitude Core module
 * @module core/Core
 */
var PlaybackSpeed = function () {
  /**
   * Handles an event on the playback speed button
   *
   * HANDLER FOR:       class="amplitude-playback-speed"
   *
   * @access public
   */
  function handle() {
    if (!_config2.default.is_touch_moving) {
      /*
      We increment the speed by .5 everytime we click
      the button to change the playback speed. Once we are
      actively playing back at 2, we start back at 1 which
      is normal speed.
      */
      switch (_config2.default.playback_speed) {
        case 1:
          _core2.default.setPlaybackSpeed(1.5);
          break;
        case 1.5:
          _core2.default.setPlaybackSpeed(2);
          break;
        case 2:
          _core2.default.setPlaybackSpeed(1);
          break;
      }

      /*
      Visually sync the playback speed.
      */
      _playbackSpeedElements2.default.sync();
    }
  }

  /*
    Returns public facing methods
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the Playback Speed Visual Elements
 * @module visual/PlaybackSpeedElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = PlaybackSpeed;
module.exports = exports["default"];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Prev Event Handler
 *
 * @module events/Prev
 */


/**
 * Imports the Amplitude Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
var Prev = function () {
  /**
   * Handles an event on the previous button
   *
   * HANDLER FOR:       class="amplitude-prev"
   *
   * GLOBAL:            class="amplitude-prev"
   * PLAYLIST:          class="amplitude-prev" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global prev.
      */
      if (playlist == null) {
        handleGlobalPrev();
      }

      /*
        If the playlist is set, we handle the playlist prev.
      */
      if (playlist != null) {
        handlePlaylistPrev(playlist);
      }
    }
  }

  /**
   * Handles an event on a global previous button.
   *
   * @access private
   */
  function handleGlobalPrev() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set prev on the playlist.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setPrevious();
    } else {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Handles an event on a previous playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the previous for.
   */
  function handlePlaylistPrev(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == _config2.default.active_playlist) {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    } else {
      _debug2.default.writeMessage("You can not go to the previous song on a playlist that is not being played!");
    }
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Prev;
module.exports = exports["default"];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _bufferedProgressElements = __webpack_require__(24);

var _bufferedProgressElements2 = _interopRequireDefault(_bufferedProgressElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Event Handler for progress
 *
 * @module events/Progress
 */
/**
 * Imports the config module
 * @module config
 */
var Progress = function () {
  /**
   * As the song is buffered, we can display the buffered percentage in
   * a progress bar.
   *
   * HANDLER FOR: progress
   *
   * @access public
   */
  function handle() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (_config2.default.audio.buffered.length - 1 >= 0) {
      var bufferedEnd = _config2.default.audio.buffered.end(_config2.default.audio.buffered.length - 1);
      var duration = _config2.default.audio.duration;

      /*
        Set the computed song buffered value to the config.
      */
      _config2.default.buffered = bufferedEnd / duration * 100;
    }

    /*
      Sync the buffered progress bars.
    */
    _bufferedProgressElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the BufferedProgressElements visual handler
 * @module visual/bufferedProgressElements.js
 */
exports.default = Progress;
module.exports = exports["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Repeat Event Handler
 *
 * @module events/Repeat
 */


/**
 * Imports the repeater utility module.
 * @module utilities/Repeater
 */
var Repeat = function () {
  /**
   * Handles an event on the repeat button
   *
   * HANDLER FOR:       class="amplitude-repeat"
   *
   * GLOBAL:            class="amplitude-repeat"
   * PLAYLIST:          class="amplitude-repeat" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global repeat.
      */
      if (playlist == null) {
        handleGlobalRepeat();
      }

      /*
        If the playlist is set, we handle the playlist repeat.
      */
      if (playlist != null) {
        handlePlaylistRepeat(playlist);
      }
    }
  }

  /**
   * Handles an event on a global repeat button.
   *
   * @access private
   */
  function handleGlobalRepeat() {
    /*
      Sets repeat to the opposite of what it was set to
    */
    _repeater2.default.setRepeat(!_config2.default.repeat);

    /*
      Visually sync repeat
    */
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Handles an event on a playlist repeat button.
   *
   * @access private
   * @prop {string} playlist - The playlist we are handling the repeat store.
   */
  function handlePlaylistRepeat(playlist) {
    /*
      Sets repeat to the opposite of what it was set to for the playlist.
    */
    _repeater2.default.setRepeatPlaylist(!_config2.default.playlists[playlist].repeat, playlist);

    /*
      Visually sync playlist repeat
    */
    _repeatElements2.default.syncRepeatPlaylist(playlist);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the visual repeat elements module
 * @module visual/RepeatElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Repeat;
module.exports = exports["default"];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles an event on the Amplitude Repeat Song.
 *
 * @module events/RepeatSong
 */


/**
 * Imports the repeat utility
 * @module utilities/Repeater
 */
var RepeatSong = function () {
  /**
   * Handles an event on the repeat song button
   *
   * HANDLER FOR: 'amplitude-repeat-song'
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
      Sets repeat song to the opposite of what it was set to
      */
      _repeater2.default.setRepeatSong(!_config2.default.repeat_song);

      /*
      Visually sync repeat song
      */
      _repeatElements2.default.syncRepeatSong();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = RepeatSong;
module.exports = exports["default"];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the shuffle events
 * @module events/Shuffle
 */


/**
 * Imports the shuffler utility
 * @module utilities/Shuffler
 */
var Shuffle = function () {
  /**
   * Handles an event on the shuffle button
   *
   * HANDLER FOR:       class="amplitude-shuffle"
   *
   * GLOBAL:            class="amplitude-shuffle"
   * PLAYLIST:          class="amplitude-shuffle" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Get the playlist attribute
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
      Check to see if the shuffle button belongs to a playlist
      */
      if (playlist == null) {
        handleGlobalShuffle();
      } else {
        handlePlaylistShuffle(playlist);
      }
    }
  }

  /**
   * Handles the event on the global shuffle button.
   */
  function handleGlobalShuffle() {
    /*
      Either shuffles or removes shuffle on the global state.
    */
    _shuffler2.default.toggleShuffle();

    /*
      Visualize the shuffle state change.
    */
    _shuffleElements2.default.syncMain(_config2.default.shuffle_on);
  }

  /**
   * Handles the event on the playlist shuffle button.
   *
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function handlePlaylistShuffle(playlist) {
    /*
      Either shuffles or removes shuffle on the playlist state.
    */
    _shuffler2.default.toggleShufflePlaylist(playlist);

    /*
      Visually sync the playlist shuffle statuses.
    */
    _shuffleElements2.default.syncPlaylist(playlist);
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the visual shuffle elements
 * @module visual/ShuffleElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Shuffle;
module.exports = exports["default"];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the skip to event.
 *
 * @module events/SkipTo
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
/**
 * Imports the config module
 * @module config
 */
var SkipTo = function () {
  /**
   * Handles an event on a skip to button.
   *
   * HANDLER FOR:       class="amplitude-skip-to"
   *
   * GLOBAL:            class="amplitude-skip-to" amplitude-song-index="song_index" amplitude-location="seconds"
   * PLAYLIST:          class="amplitude-skip-to" amplitude-playlist="playlist_key" amplitude-song-index="song_index" amplitude-location="seconds"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Extracts the needed attributes from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");
      var songIndex = this.getAttribute("data-amplitude-song-index");
      var location = this.getAttribute("data-amplitude-location");

      /*
        If the location is null, write a message. We can't skip to a location
        that is null
      */
      if (location == null) {
        _debug2.default.writeMessage("You must add an 'data-amplitude-location' attribute in seconds to your 'amplitude-skip-to' element.");
      }

      /*
        If the song index is null, write a debug message. We can't skip to a location
        of a null song.
      */
      if (songIndex == null) {
        _debug2.default.writeMessage("You must add an 'data-amplitude-song-index' attribute to your 'amplitude-skip-to' element.");
      }

      /*
        If the location and song index are set, continue.
      */
      if (location != null && songIndex != null) {
        /*
        Determines if the skip to button is in the scope of a playlist.
        */
        if (playlist == null) {
          handleSkipToSong(parseInt(songIndex), parseInt(location));
        } else {
          handleSkipToPlaylist(playlist, parseInt(songIndex), parseInt(location));
        }
      }
    }
  }

  /**
   * Handles the skipping to a specific song
   *
   * @access private
   * @param {string} songIndex  - The index of the song being skipped to
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToSong(songIndex, location) {
    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    _audioNavigation2.default.changeSong(_config2.default.songs[songIndex], songIndex);
    _core2.default.play();

    /*
      Syncs all of the play pause buttons now that we've skipped.
    */
    _playPauseElements2.default.syncGlobal();
    _playPauseElements2.default.syncSong();

    /*
      Skip to the location in the song.
    */
    _core2.default.skipToLocation(location);
  }

  /**
   * Handles the skipping to a song that's in a playlist.
   *
   * @access private
   * @param {string} playlist   - The playlist being skipped to
   * @param {string} songIndex  - The index of the song in the playlist
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToPlaylist(playlist, songIndex, location) {
    /*
      Checks if we are skipping to a new playlist
    */
    if (_checks2.default.newPlaylist(playlist)) {
      _audioNavigation2.default.setActivePlaylist(playlist);
    }

    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[songIndex], songIndex);
    _core2.default.play();

    /*
      Sync all of the play pause elements.
    */
    _playPauseElements2.default.syncGlobal();
    _playPauseElements2.default.syncPlaylist();
    _playPauseElements2.default.syncSong();

    /*
      Skip to the location in the song.
    */
    _core2.default.skipToLocation(location);
  }

  /**
   * Return public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */
exports.default = SkipTo;
module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _time = __webpack_require__(23);

var _time2 = _interopRequireDefault(_time);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the song slider to event.
 *
 * @module events/SongSlider
 */


/**
 * Imports the time utility
 * @module utilities/Time
 */
var SongSlider = function () {
  /**
   * Handles a song slider element.
   *
   * HANDLER FOR:       class="amplitude-song-slider"
   *
   * GLOBAL:            class="amplitude-song-slider"
   * PLAYLIST:          class="amplitude-song-slider" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-song-slider" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-song-slider" amplitude-playlist="playlist_key" amplitude-song-index="song_index"
   *
   * @access public
   */
  function handle() {
    /*
    Gets the percentage of the song we will be setting the location for.
    */
    var locationPercentage = this.value;

    /*
      Computes the time in seconds for the current song.
    */
    var computedTime = _config2.default.audio.duration * (locationPercentage / 100);

    /*
      Gets the attributes for playlist and index for the element.
    */
    var playlist = this.getAttribute("data-amplitude-playlist");
    var song = this.getAttribute("data-amplitude-song-index");

    /*
      If no playlist or song is defined, then it's a global song slider.
    */
    if (playlist == null && song == null) {
      handleGlobalSongSlider(computedTime, locationPercentage);
    }

    /*
      If a playlist but no song is defined, then it's playlist slider.
    */
    if (playlist != null && song == null) {
      handlePlaylistSongSlider(computedTime, locationPercentage, playlist);
    }

    /*
      If no playlist but a song is defined, then it's a song slider.
    */
    if (playlist == null && song != null) {
      handleSongSongSlider(computedTime, locationPercentage, song);
    }

    /*
      If playlist and song are defined then it's a song in a playlist
      slider.
    */
    if (playlist != null && song != null) {
      handleSongInPlaylistSongSlider(computedTime, locationPercentage, playlist, song);
    }
  }

  /**
   * Handles a change on a global audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   */
  function handleGlobalSongSlider(computedTime, locationPercentage) {
    /*
    If the active song is not live, set the current time and adjust the slider.
    */
    if (!_config2.default.active_metadata.live) {
      _time2.default.setCurrentTime(computedTime);

      /*
        Sync song slider elements.
      */
      _songSliderElements2.default.sync(locationPercentage, _config2.default.active_playlist, _config2.default.active_index);
    }
  }

  /**
   * Handles a change on a playlist audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {string}  playlist = The playlist the song slider belongs to.
   */
  function handlePlaylistSongSlider(computedTime, locationPercentage, playlist) {
    /*
    We don't want to song slide a playlist that's not the
    active placylist.
    */
    if (_config2.default.active_playlist == playlist) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, playlist, _config2.default.active_index);
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongSongSlider(computedTime, locationPercentage, songIndex) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected.
    */
    if (_config2.default.active_index == songIndex && _config2.default.active_playlist == null) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, _config2.default.active_playlist, songIndex);
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} playlist = The playlist the song belongs to.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongInPlaylistSongSlider(computedTime, locationPercentage, playlist, songIndex) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected and the active playlist is the same
      as the playlist selected.
    */
    if (_config2.default.playlists[playlist].active_index == songIndex && _config2.default.active_playlist == playlist) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, playlist, songIndex);
      }
    }
  }

  /*
    Return public facing methods
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the song slider elements.
 * @module visual/SongSliderElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = SongSlider;
module.exports = exports["default"];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the stop events
 * @module events/Stop
 */


/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
/**
 * Imports the config module
 * @module config
 */
var Stop = function () {
  /**
   * Handles an event on a stop element.
   *
   * HANDLER FOR:       class="amplitude-stop"
   *
   * @access public
   */
  function handle() {
    /*
      If touch is not moving, we run. We don't want to accidentally press
      stop if touch is moving.
    */
    if (!_config2.default.is_touch_moving) {
      /*
      Sets all of the play/pause buttons to pause
      */
      _playPauseElements2.default.syncToPause();

      /*
      Stops the active song.
      */
      _core2.default.stop();
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */


/**
 * Imports the config state module.
 * @module utilities/configState
 */
exports.default = Stop;
module.exports = exports["default"];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _bufferedProgressElements = __webpack_require__(24);

var _bufferedProgressElements2 = _interopRequireDefault(_bufferedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _time = __webpack_require__(23);

var _time2 = _interopRequireDefault(_time);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Event Handler for Time Update
 *
 * @module events/TimeUpdate
 */


/**
 * Imports the Time utility class
 * @module utilities/Time
 */


/**
 * Imports the Song Slider Elements visual class.
 * @module visual/songSliderElements
 */


/**
 * Imports the Buffered Progress Elements visual class
 * @module visual/bufferedProgressElements
 */
var TimeUpdate = function () {
  /**
   * When the time updates on the active song, we sync the current time displays
   *
   * HANDLER FOR: timeupdate
   *
   * @access public
   */
  function handle() {
    /*
      Computes the buffered time.
    */
    computeBufferedTime();

    /*
      Sync the buffered progress elements.
    */
    _bufferedProgressElements2.default.sync();

    /*
      Updates the current time information.
    */
    updateTimeInformation();

    /*
      Run time callbacks
    */
    runTimeCallbacks();
  }

  /**
   * Computes the buffered time
   */
  function computeBufferedTime() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (_config2.default.audio.buffered.length - 1 >= 0) {
      var bufferedEnd = _config2.default.audio.buffered.end(_config2.default.audio.buffered.length - 1);
      var duration = _config2.default.audio.duration;

      _config2.default.buffered = bufferedEnd / duration * 100;
    }
  }

  /**
   * Updates the current time information.
   * @access private
   */
  function updateTimeInformation() {
    /*
      If the current song is not live, then
      we can update the time information. Otherwise the
      current time updates wouldn't mean much since the time
      is infinite.
    */
    if (!_config2.default.active_metadata.live) {
      /*
        Compute the current time
      */
      var currentTime = _time2.default.computeCurrentTimes();

      /*
        Compute the song completion percentage
      */
      var songCompletionPercentage = _time2.default.computeSongCompletionPercentage();

      /*
        Computes the song duration
      */
      var songDuration = _time2.default.computeSongDuration();

      /*
        Sync the current time elements with the current
        location of the song and the song duration elements with
        the duration of the song.
      */
      _timeElements2.default.syncCurrentTimes(currentTime);

      /*
        Sync the song slider elements.
      */
      _songSliderElements2.default.sync(songCompletionPercentage, _config2.default.active_playlist, _config2.default.active_index);

      /*
        Sync the song played progress elements.
      */
      _songPlayedProgressElements2.default.sync(songCompletionPercentage);

      /*
        Sync the duration time elements.
      */
      _timeElements2.default.syncDurationTimes(currentTime, songDuration);
    }
  }

  /**
   * Runs a callback at a certain time in the song.
   */
  function runTimeCallbacks() {
    /*
      Gets the current seconds into the song.
    */
    var currentSeconds = Math.floor(_config2.default.audio.currentTime);

    /*
      Checks to see if there is a callback at the certain seconds into the song.
    */
    if (_config2.default.active_metadata.time_callbacks != undefined && _config2.default.active_metadata.time_callbacks[currentSeconds] != undefined) {
      /*
        Checks to see if the callback has been run. Since the time updates more than
        one second, we don't want the callback to run X times.
      */
      if (!_config2.default.active_metadata.time_callbacks[currentSeconds].run) {
        _config2.default.active_metadata.time_callbacks[currentSeconds].run = true;
        _config2.default.active_metadata.time_callbacks[currentSeconds]();
      }
    } else {
      /*
        Iterate over all of the callbacks for a song. If the song has one, we flag
        the run as false. This occurs because we have passed the active second for
        the callback, so we flag it as not run. It will either run again if the user
        seeks back or not run in the future.
      */
      for (var seconds in _config2.default.active_metadata.time_callbacks) {
        if (_config2.default.active_metadata.time_callbacks.hasOwnProperty(seconds)) {
          _config2.default.active_metadata.time_callbacks[seconds].run = false;
        }
      }
    }
  }
  /**
   * Returns public functions
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the Callback utility class
 * @module utilities/Callbacks
 */


/**
 * Imports the Song Played Progress Elements visual class.
 * @module visual/songPlayedProgressElements
 */


/**
 * Imports the Time Elements visual class.
 * @module visual/timeElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = TimeUpdate;
module.exports = exports["default"];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume down event.
 * @module events/VolumeDown
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeDown = function () {
  /**
   * Handles a click on a volume down element.
   *
   * HANDLER FOR:       class="amplitude-volume-down"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      The volume range is from 0 to 1 for an audio element. We make this
      a base of 100 for ease of working with.
      If the new value is less than 100, we use the new calculated
      value which gets converted to the proper unit for the audio element.
      If the new value is greater than 100, we set the volume to 1 which
      is the max for the audio element.
      */
      var volume = null;

      if (_config2.default.volume - _config2.default.volume_increment > 0) {
        volume = _config2.default.volume - _config2.default.volume_increment;
      } else {
        volume = 0;
      }

      /*
      Calls the core function to set the volume to the computed value
      based on the user's intent.
      */
      _core2.default.setVolume(volume);

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
        Sync Volume Slider Elements
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeDown;
module.exports = exports["default"];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume up event.
 * @module events/VolumeSlider
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeSlider = function () {
  /**
   * Handles a change on the volume slider
   *
   * HANDLER FOR:       class="amplitude-volume-slider"
   *
   * @access public
   */
  function handle() {
    /*
    Calls the core function to set the volume to the computed value
    based on the user's intent.
    */
    _core2.default.setVolume(this.value);

    /*
      Sync Mute Elements.
    */
    _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

    /*
    Sync the volume slider locations
    */
    _volumeSliderElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeSlider;
module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume up event.
 * @module events/VolumeUp
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeUp = function () {
  /**
   * Handles a click on a volume up element.
   *
   * HANDLER FOR:       class="amplitude-volume-up"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      The volume range is from 0 to 1 for an audio element. We make this
      a base of 100 for ease of working with.
      If the new value is less than 100, we use the new calculated
      value which gets converted to the proper unit for the audio element.
      If the new value is greater than 100, we set the volume to 1 which
      is the max for the audio element.
      */
      var volume = null;

      if (_config2.default.volume + _config2.default.volume_increment <= 100) {
        volume = _config2.default.volume + _config2.default.volume_increment;
      } else {
        volume = 100;
      }

      /*
      Calls the core function to set the volume to the computed value
      based on the user's intent.
      */
      _core2.default.setVolume(volume);

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
        Sync Volume Slider Elements
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeUp;
module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS FX Module. Helps with configuring and setting up visualizations
 * and any other features of the Web Audio API that Amplitude takes advantage
 * of.
 *
 * @module fx/FX
 */
var Fx = function () {
  /**
   * Configures the Web Audio API to work with AmplitudeJS
   */
  function configureWebAudioAPI() {
    /*
    Gets the context for the browser. If this is null, the Web Audio
    API is unavailable.
    */
    var browserContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;

    /*
    If we have a context, the Web Audio API is available and we can continue,
    otherwise, we alert the user if they have debug turned on.
    */
    if (browserContext) {
      /*
      Web Audio API is available, set the context in our config.
      */
      _config2.default.context = new browserContext();

      /*
      Create an analyzer that we will use in the context.
      */
      _config2.default.analyser = _config2.default.context.createAnalyser();

      /*
      Set cross origin to anonymous so we have a better chance of being able
      to use the power of the Web Audio API.
      */
      _config2.default.audio.crossOrigin = "anonymous";

      /*
      Bind the source to the Javascript Audio Element.
      */
      _config2.default.source = _config2.default.context.createMediaElementSource(_config2.default.audio);

      /*
      Connect the analyser to the source
      */
      _config2.default.source.connect(_config2.default.analyser);

      /*
      Connect the context destination to the analyser.
      */
      _config2.default.analyser.connect(_config2.default.context.destination);
    } else {
      AmplitudeHelpers.writeDebugMessage("Web Audio API is unavailable! We will set any of your visualizations with your back up definition!");
    }
  }

  /**
   * Determines if the web audio API is available or not.
   */
  function webAudioAPIAvailable() {
    /*
    Gets the context for the browser. If this is null, the Web Audio
    API is unavailable.
    */
    var browserContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
    _config2.default.web_audio_api_available = false;

    /*
    Determines if the Web Audio API is available or not.
    */
    if (browserContext) {
      /*
      Set the flag in the config that the Web Audio API is available
      */
      _config2.default.web_audio_api_available = true;
      return true;
    } else {
      /*
      Set the flag in the config that the Web Audio API is not available
      */
      _config2.default.web_audio_api_available = false;
      return false;
    }
  }

  /**
   * Determines if the user is using any of the web audio API features.
   */
  function determineUsingAnyFX() {
    var waveforms = document.querySelectorAll(".amplitude-wave-form");
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    if (waveforms.length > 0 || visualizationElements.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
  Returns the publicly accessible methods
  */
  return {
    configureWebAudioAPI: configureWebAudioAPI,
    webAudioAPIAvailable: webAudioAPIAvailable,
    determineUsingAnyFX: determineUsingAnyFX
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Fx;
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = __webpack_require__(21);

var _init2 = _interopRequireDefault(_init);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */


/**
 * Meta Data Elements
 * @module visual/MetaDataElements
 */


/**
 * Time Elements
 * @module visual/TimeElements
 */


/**
 * Song Slider Elements
 * @module visual/SongSliderElements
 */


/****************************************************
 * Elements
 ****************************************************/
/**
 * Visual Shuffle Elements
 * @module visual/ShuffleElements
 */


/**
 * Imports the checks
 * @module utilities/Checks
 */


/**
 * Imports the audio navigation
 * @module utilities/AudioNavigation
 */


/****************************************************
 * Utilities
 ****************************************************/
/**
 * Shuffler Module
 * @module utilities/Shuffler
 */


/****************************************************
 * Config
 ****************************************************/
/**
 * Imports the config module
 * @module config
 */
var Amplitude = function () {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json );
   *
   * @access public
   * @param {object} userConfig 	- A JSON object of user defined values that helps configure and initialize AmplitudeJS.
   */
  function init(userConfig) {
    _init2.default.initialize(userConfig);
  }

  /**
   * Returns the current config for AmplitudeJS
   */
  function getConfig() {
    return _config2.default;
  }

  /**
   * Binds new elements that were added to the page.
   *
   * Public Accessor: Amplitude.bindNewElements()
   *
   * @access public
   */
  function bindNewElements() {
    _init2.default.rebindDisplay();
  }

  /**
   * Returns the active playlist.
   *
   * Public Accessor: Amplitude.getActivePlaylist()
   *
   * @access public
   */
  function getActivePlaylist() {
    return _config2.default.active_playlist;
  }

  /**
   * Returns the current playback speed.
   *
   * Public Accessor: Amplitude.getPlaybackSpeed()
   *
   * @access public
   */
  function getPlaybackSpeed() {
    return _config2.default.playback_speed;
  }

  /**
   * Sets the playback speed
   *
   * Public Accessor: Amplitude.setPlaybackSpeed( speed )
   *
   * @access public
   */
  function setPlaybackSpeed(speed) {
    /*
      Increments are set in .5 We only accept values
      1, 1.5, 2
       1 -> Regular Speed
      1.5 -> 50% faster
      2 -> Twice as fast
    */
    _core2.default.setPlaybackSpeed(speed);

    /*
      Visually sync the playback speed.
    */
    _playbackSpeedElements2.default.sync();
  }

  /**
   * Gets the repeat state of the player.
   *
   * Public Accessor: Amplitude.getRepeat()
   *
   * @access public
   */
  function getRepeat() {
    return _config2.default.repeat;
  }

  /**
   * Gets the repeat state for a playlist
   *
   * Public Accessor: Amplitude.getRepeatPlaylist()
   *
   * @access public
   */
  function getRepeatPlaylist(playlistKey) {
    return _config2.default.playlists[playlistKey].repeat;
  }

  /**
   * Returns the shuffle state of the player.
   *
   * Public Accessor: Amplitude.getShuffle()
   *
   * @access public
   */
  function getShuffle() {
    return _config2.default.shuffle_on;
  }

  /**
   * Returns the shuffle state of the playlist.
   *
   * Public Accessor: Amplitude.getShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to see if it's shuffled or not.
   */
  function getShufflePlaylist(playlist) {
    return _config2.default.playlists[playlist].shuffle;
  }

  /**
   * Sets the shuffle state for the player.
   *
   * Public Accessor: Amplitude.setShuffle()
   *
   * @param {boolean} shuffle  	- True when we are shuffling the songs, false when we turn off shuffle.
   *
   * @access public
   */
  function setShuffle(shuffle) {
    _shuffler2.default.setShuffle(shuffle);

    _shuffleElements2.default.syncMain();
  }

  /**
   * Sets the shuffle state for the playlist
   *
   * Public Accessor: Amplitude.setShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} shuffle 	- True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    _shuffler2.default.setShufflePlaylist(playlist, shuffle);

    _shuffleElements2.default.syncMain();
    _shuffleElements2.default.syncPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the player.
   *
   * Public Accessor: Amplitude.setRepeat()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song to be in.
   */
  function setRepeat(repeatState) {
    _repeater2.default.setRepeat(repeatState);
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Sets the repeat state for a playlist.
   *
   * Public Accessor: Amplitude.setRepeatPlaylist( playlistKey )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} repeatState - The state you want the repeat playlist to be in.
   */
  function setRepeatPlaylist(playlist, repeatState) {
    _repeater2.default.setRepeatPlaylist(repeatState, playlist);
    _repeatElements2.default.syncRepeatPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the song.
   *
   * Public Accessor: Amplitude.setRepeatSong()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song status to be in.
   */
  function setRepeatSong(repeatState) {
    if (!_config2.default.is_touch_moving) {
      /*
      Sets repeat to the opposite of what it was set to
      */
      _repeater2.default.setRepeatSong(!_config2.default.repeat_song);

      /*
      Visually sync repeat song
      */
      _repeatElements2.default.syncRepeatSong();
    }
  }

  /**
   * Gets the default album art for the player
   *
   * Public Accessor: Amplitude.getDefaultAlbumArt()
   *
   * @access public
   */
  function getDefaultAlbumArt() {
    return _config2.default.default_album_art;
  }

  /**
   * Gets the default playlist art for the playlists
   *
   * Public Accessor: Amplitude.getDefaultPlaylistArt()
   *
   * @access public
   */
  function getDefaultPlaylistArt() {
    return _config2.default.default_playlist_art;
  }

  /**
   * Sets the default album art for the player
   *
   * Public Accessor: Amplitude.setDefaultAlbumArt( url )
   *
   * @access public
   * @param {string} url 	- A string representing the URL of the new default album art.
   */
  function setDefaultAlbumArt(url) {
    _config2.default.default_album_art = url;
  }

  /**
   * Sets the default playlist art for the player
   *
   * Public Accessor: Amplitude.setDefaultPlaylistArt( url )
   *
   * @access public
   * @param {string} url - A string representing the URL of the new default playlist art.
   */
  function setDefaultPlaylistArt(url) {
    _config2.default.default_plalist_art = url;
  }

  /**
   * Allows the user to get the percentage of the song played.
   *
   * Public Accessor: Amplitude.getSongPlayedPercentage();
   *
   * @access public
   */
  function getSongPlayedPercentage() {
    /*
    Returns the percentage of the song played.
    */
    return _config2.default.audio.currentTime / _config2.default.audio.duration * 100;
  }

  /**
   * Allows the user to get the amount of seconds the song has played.
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongPlayedSeconds() {
    /*
    Returns the amount of seconds the song has played.
    */
    return _config2.default.audio.currentTime;
  }

  /**
   * Allows the user to get the duration of the current song
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongDuration() {
    /*
    Returns the duration of the current song
    */
    return _config2.default.audio.duration;
  }

  /**
   * Allows the user to set how far into the song they want to be. This is
   * helpful for implementing custom range sliders. Only works on the current song.
   *
   * Public Accessor: Amplitude.setSongPlayedPercentage( float );
   *
   * @access public
   * @param {number} percentage 	- The percentage of the song played
   */
  function setSongPlayedPercentage(percentage) {
    /*
    Ensures the percentage is a number and is between 0 and 100.
    */
    if (typeof percentage == "number" && percentage > 0 && percentage < 100) {
      /*
      Sets the current time of the song to the percentage.
      */
      _config2.default.audio.currentTime = _config2.default.audio.duration * (percentage / 100);
    }
  }

  /**
   * Allows the user to turn on debugging.
   *
   * Public Accessor: Amplitude.setDebug( bool );
   *
   * @access public
   * @param {boolean} state 		- Turns debugging on and off.
   */
  function setDebug(state) {
    /*
    Sets the global config debug on or off.
    */
    _config2.default.debug = state;
  }

  /**
   * Returns the active song meta data for the user to do what is
   * needed.
   *
   * Public Accessor: Amplitude.getActiveSongMetadata();
   *
   * @access public
   * @returns {object} JSON Object with the active song information
   */
  function getActiveSongMetadata() {
    return _config2.default.active_metadata;
  }

  /**
   * Returns the active playlist meta data for the for the user to use.
   *
   * Public Accessor: Amplitude.getActivePlaylistMetadata();
   *
   * @access public
   * @returns {object} JSON representation for the active playlist
   */
  function getActivePlaylistMetadata() {
    return _config2.default.playlists[_config2.default.active_playlist];
  }

  /**
   * Returns a song in the songs array at that index
   *
   * Public Accessor: Amplitude.getSongAtIndex( song_index )
   *
   * @access public
   * @param {number} index 	- The integer for the index of the song in the songs array.
   * @returns {object} JSON representation for the song at a specific index.
   */
  function getSongAtIndex(index) {
    return _config2.default.songs[index];
  }

  /**
   * Returns a song at a playlist index
   *
   * Public Accessor: Amplitude.getSongAtPlaylistIndex( playlist, index
   *
   * @access public
   * @param {number} index 			- The integer for the index of the song in the playlist.
   * @param {string} playlist		- The key of the playlist we are getting the song at the index for
   * @returns {object} JSON representation for the song at a specific index.
   */
  function getSongAtPlaylistIndex(playlist, index) {
    var song = _config2.default.playlists[playlist].songs[index];

    return song;
  }

  /**
   * Adds a song to the end of the config array.  This will allow Amplitude
   * to play the song in a playlist type setting.
   *
   * Public Accessor: Amplitude.addSong( song_json )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   * @returns {number} New index of the song.
   */
  function addSong(song) {
    /*
    Ensures we have a songs array to push to.
    */
    if (_config2.default.songs == undefined) {
      _config2.default.songs = [];
    }

    _config2.default.songs.push(song);

    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_list.push(song);
    }

    if (_soundcloud2.default.isSoundCloudURL(song.url)) {
      _soundcloud2.default.resolveIndividualStreamableURL(song.url, null, _config2.default.songs.length - 1, _config2.default.shuffle_on);
    }

    return _config2.default.songs.length - 1;
  }

  /**
   * Adds a song to the beginning of the config array.
   * This will allow Amplitude to play the song in a
   * playlist type setting.
   *
   * Public Accessor: Amplitude.addSong( song_json )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   * @returns {number} New index of the song (0)
   */
  function prependSong(song) {
    /*
    Ensures we have a songs array to push to.
    */
    if (_config2.default.songs == undefined) {
      _config2.default.songs = [];
    }

    _config2.default.songs.unshift(song);

    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_list.unshift(song);
    }

    if (_soundcloud2.default.isSoundCloudURL(song.url)) {
      _soundcloud2.default.resolveIndividualStreamableURL(song.url, null, _config2.default.songs.length - 1, _config2.default.shuffle_on);
    }

    return 0;
  }

  /**
   * Adds a song to a playlist. This will allow Amplitude to play the song in the
   * playlist
   *
   * Public Accessor: Amplitude.addSongToPlaylist( song_json, playlist_key )
   *
   * @access public
   * @param {object} song 			- JSON representation of a song.
   * @param {string} playlist		- Playlist we are adding the song to.
   * @returns {mixed} New index of song in playlist or null if no playlist exists
   */
  function addSongToPlaylist(song, playlist) {
    if (_config2.default.playlists[playlist] != undefined) {
      _config2.default.playlists[playlist].songs.push(song);

      if (_config2.default.playlists[playlist].shuffle) {
        _config2.default.playlists[playlist].shuffle_list.push(song);
      }

      if (_soundcloud2.default.isSoundCloudURL(song.url)) {
        _soundcloud2.default.resolveIndividualStreamableURL(song.url, playlist, _config2.default.playlists[playlist].songs.length - 1, _config2.default.playlists[playlist].shuffle);
      }

      return _config2.default.playlists[playlist].songs.length - 1;
    } else {
      _debug2.default.writeMessage("Playlist doesn't exist!");
      return null;
    }
  }

  /**
   * Adds a playlist to Amplitude.
   *
   * @param {string} key  - The key of the playlist we are adding.
   * @param {object} data - The data relating to the playlist
   * @param {array} songs - The songs to add to the playlist
   */
  function addPlaylist(key, data, songs) {
    /*
      Ensures the playlist is not already defined.
    */
    if (_config2.default.playlists[key] == undefined) {
      /*
        Initialize the new playlist object.
      */
      _config2.default.playlists[key] = {};

      /*
        Define the ignored keys that we don't want to copy over.
      */
      var ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      /*
        Iterate over all of the keys defined by the user and
        set them on the playlist.
      */
      for (var dataKey in data) {
        if (ignoredKeys.indexOf(dataKey) < 0) {
          _config2.default.playlists[key][dataKey] = data[dataKey];
        }
      }

      /*
        Initialize the default parameters for the playlist and set the songs.
      */
      _config2.default.playlists[key].songs = songs;
      _config2.default.playlists[key].active_index = null;
      _config2.default.playlists[key].repeat = false;
      _config2.default.playlists[key].shuffle = false;
      _config2.default.playlists[key].shuffle_list = [];

      return _config2.default.playlists[key];
    } else {
      _debug2.default.writeMessage("A playlist already exists with that key!");
      return null;
    }
  }

  /**
   * Removes a song from the song array
   *
   * Public Accessor: Amplitude.removeSong( index )
   *
   * @access public
   * @param {integer} index - Index of the song being removed
   * @returns {boolean} True if removed false if not.
   */
  function removeSong(index) {
    _config2.default.songs.splice(index, 1);
  }

  /**
   * Removes a song from the playlist
   *
   * Public Accessor: Amplitude.removeSongFromPlaylist( index, playlist )
   *
   * @access public
   * @param {integer} index 			- Index of the song being removed from the playlist.
   * @param {string} playlist			- Playlist we are removing the song from.
   * @returns {boolean} True if removed false if not.
   */
  function removeSongFromPlaylist(index, playlist) {
    if (_config2.default.playlists[playlist] != undefined) {
      _config2.default.playlists[playlist].songs.splice(index, 1);
    }
  }

  /**
   * When you pass a song object it plays that song right awawy.  It sets
   * the active song in the config to the song you pass in and synchronizes
   * the visuals.
   *
   * Public Accessor: Amplitude.playNow( song )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   */
  function playNow(song) {
    /*
    Makes sure the song object has a URL associated with it
    or there will be nothing to play.
    */
    if (song.url) {
      _config2.default.audio.src = song.url;
      _config2.default.active_metadata = song;
      _config2.default.active_album = song.album;
    } else {
      /*
      Write error message since the song passed in doesn't
      have a URL.
      */
      _debug2.default.writeMessage("The song needs to have a URL!");
    }

    /*
    Plays the song.
    */
    _core2.default.play();

    /*
    Sets the main song control status visual
    */
    _playPauseElements2.default.sync();

    /*
    Update the song meta data
    */
    _metaDataElements2.default.displayMetaData();

    /*
    Reset the song sliders, song progress bar info, and
    reset times. This ensures everything stays in sync.
    */
    _songSliderElements2.default.resetElements();

    /*
    Reset the song played progress elements.
    */
    _songPlayedProgressElements2.default.resetElements();

    /*
    Reset all of the current time elements.
    */
    _timeElements2.default.resetCurrentTimes();

    /*
    Reset all of the duration time elements.
    */
    _timeElements2.default.resetDurationTimes();
  }

  /**
   * Plays a song at the index passed in from the songs array.
   *
   * Public Accessor: Amplitude.playSongAtIndex( index )
   *
   * @access public
   * @param {number} index 	- The number representing the song in the songs array.
   */
  function playSongAtIndex(index) {
    /*
    Stop the current song.
    */
    _core2.default.stop();

    /*
    Determine if there is a new playlist, if so set the active playlist and change the song.
    */
    if (_checks2.default.newPlaylist(null)) {
      _audioNavigation2.default.setActivePlaylist(null);

      _audioNavigation2.default.changeSong(_config2.default.songs[index], index);
    }

    /*
    Check if the song is new. If so, change the song.
    */
    if (_checks2.default.newSong(null, index)) {
      _audioNavigation2.default.changeSong(_config2.default.songs[index], index);
    }

    /*
    Play the song
    */
    _core2.default.play();

    /*
    Sync all of the play pause buttons.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Plays a song at the index passed in for the playlist provided. The index passed
   * in should be the index of the song in the playlist and not the songs array.
   *
   * @access public
   * @param {number} index 		- The number representing the song in the playlist array.
   * @param {string} playlist - The key string representing the playlist we are playing the song from.
   *
   */
  function playPlaylistSongAtIndex(index, playlist) {
    _core2.default.stop();

    /*
    Determine if there is a new playlist, if so set the active playlist and change the song.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      _audioNavigation2.default.setActivePlaylist(playlist);

      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[index], index);
    }

    /*
    Check if the song is new. If so, change the song.
    */
    if (_checks2.default.newSong(playlist, index)) {
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[index], index);
    }

    /*
    Sync all of the play pause buttons.
    */
    _playPauseElements2.default.sync();

    /*
    Play the song
    */
    _core2.default.play();
  }

  /**
   * Allows the user to play whatever the active song is directly
   * through Javascript. Normally ALL of Amplitude functions that access
   * the core features are called through event handlers.
   *
   * Public Accessor: Amplitude.play();
   *
   * @access public
   */
  function play() {
    _core2.default.play();
  }

  /**
   * Allows the user to pause whatever the active song is directly
   * through Javascript. Normally ALL of Amplitude functions that access
   * the core features are called through event handlers.
   *
   * Public Accessor: Amplitude.pause();
   *
   * @access public
   */
  function pause() {
    _core2.default.pause();
  }

  /**
   * Allows the user to stop whatever the active song is directly
   * through Javascript.
   *
   * Public Accessor: Amplitude.stop();
   *
   * @access public
   */
  function stop() {
    _core2.default.stop();
  }

  /**
   * Returns the audio object used to play the audio
   *
   * Public Accessor: Amplitude.getAudio();
   *
   * @access public
   */
  function getAudio() {
    return _config2.default.audio;
  }

  /**
   * Returns the Web Audio API ANalyser used for visualizations.
   *
   * Public Accessor: Amplitude.getAnalyser()
   *
   * @access public
   */
  function getAnalyser() {
    return _config2.default.analyser;
  }

  /**
   * Plays the next song either in the playlist or globally.
   *
   * Public Accessor: Amplitude.next( playlist );
   *
   * @access public
   * @param {string} [playlist = null 	- The playlist key
   */
  function next() {
    var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var nextData = {};
    /*
    If the playlist is empty or null, then we check the active
    playlist
    */
    if (playlist == "" || playlist == null) {
      /*
      If the active playlist is null, then we set the next global
      song or we set the next in the playlist.
      */
      if (_config2.default.active_playlist == null || _config2.default.active_playlist == "") {
        _audioNavigation2.default.setNext();
      } else {
        _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
      }
    } else {
      _audioNavigation2.default.setNextPlaylist(playlist);
    }
  }

  /**
   * Plays the prev song either in the playlist or globally.
   *
   * Public Accessor: Amplitude.prev( playlist );
   *
   * @access public
   * @param {string} [playlist = null] 	- The playlist key
   */
  function prev() {
    var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var prevData = {};

    /*
    If the playlist is empty or null, then we check the active
    playlist
    */
    if (playlist == "" || playlist == null) {
      /*
      If the active playlist is null, then we set the prev global
      song or we set the prev in the playlist.
      */
      if (_config2.default.active_playlist == null || _config2.default.active_playlist == "") {
        _audioNavigation2.default.setPrevious();
      } else {
        _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
      }
    } else {
      _audioNavigation2.default.setPreviousPlaylist(playlist);
    }
  }

  /**
   * Gets all of the songs in the songs array
   *
   * Public Accessor: Amplitude.getSongs( );
   *
   * @access public
   */
  function getSongs() {
    return _config2.default.songs;
  }

  /**
   * Gets all of the songs in a playlist
   *
   * Public Accessor: Amplitude.getSongsInPlaylist( playlist );
   *
   * @access public
   * @param {string} playlist 	- The playlist key
   */
  function getSongsInPlaylist(playlist) {
    return _config2.default.playlists[playlist].songs;
  }

  /**
   * Get current state of songs. If shuffled, this will return the shuffled
   * songs.
   *
   * Public Accessor: Amplitude.getSongsState();
   *
   * @access public
   */
  function getSongsState() {
    if (_config2.default.shuffle_on) {
      return _config2.default.shuffle_list;
    } else {
      return _config2.default.songs;
    }
  }

  /**
   * Get current state of songs in playlist. If shuffled, this will return the
   * shuffled songs.
   *
   * Public Accessor: Amplitude.getSongsStatePlaylist( playlist );
   *
   * @access public
   * @param {string} playlist 	- The playlist key
   */
  function getSongsStatePlaylist(playlist) {
    if (_config2.default.playlists[playlist].shuffle) {
      return _config2.default.playlists[playlist].shuffle_list;
    } else {
      return _config2.default.playlists[playlist].songs;
    }
  }

  /**
   * Gets the active index of the player
   *
   * Public Accessor: Amplitude.getActiveIndex()
   *
   * @access public
   */
  function getActiveIndex() {
    return parseInt(_config2.default.active_index);
  }

  /**
   * Get the version of AmplitudeJS
   *
   * Public Accessor: Amplitude.getVersion()
   *
   * @access public
   */
  function getVersion() {
    return _config2.default.version;
  }

  /**
   * Get the buffered amount for the current song
   *
   * Public Accessor: Amplitude.getBuffered()
   *
   * @access public
   */
  function getBuffered() {
    return _config2.default.buffered;
  }

  /**
   * Skip to a certain location in a selected song.
   *
   * Public Accessor: Amplitude.getBuffered()
   *
   * @access public
   * @param {number} seconds 						- The amount of seconds we should skip to in the song.
   * @param {number} songIndex 					- The index of the song in the songs array.
   * @param {string} [playlist = null]	- The playlist the song we are skipping to belogns to.
   */
  function skipTo(seconds, songIndex) {
    var playlist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    seconds = parseInt(seconds);

    if (playlist != null) {
      /*
        Checks if we are skipping to a new playlist
      */
      if (_checks2.default.newPlaylist(playlist)) {
        _audioNavigation2.default.setActivePlaylist(playlist);
      }

      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[songIndex], songIndex);
      _core2.default.play();

      /*
        Sync all of the play pause elements.
      */
      _playPauseElements2.default.syncGlobal();
      _playPauseElements2.default.syncPlaylist();
      _playPauseElements2.default.syncSong();

      /*
        Skip to the location in the song.
      */
      _core2.default.skipToLocation(seconds);
    } else {
      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[songIndex], songIndex);
      _core2.default.play();

      /*
        Syncs all of the play pause buttons now that we've skipped.
      */
      _playPauseElements2.default.syncGlobal();
      _playPauseElements2.default.syncSong();

      /*
        Skip to the location in the song.
      */
      _core2.default.skipToLocation(seconds);
    }
  }

  /**
   * Sets the meta data for a song in the songs array. This will set any
   * meta data for a song besides the URL. The URL could cause issues if the
   * song was playing.
   *
   * Public Accessor: Amplitude.setSongMetaData()
   *
   * @access public
   * @param {number} index					- The index of the song in the songs array.
   * @param {object} metaData 			- The object containing the meta data we are updating.
   * @param {string} playlist       - The playlist we are updating the song meta data for.
   */
  function setSongMetaData(index, metaData) {
    var playlist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    /*
      Update the meta data for a song in a playlist.
    */
    if (playlist != "" && playlist != null && _config2.default.playlists[playlist] != undefined) {
      /*
        Set all of the defined meta data properties
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            _config2.default.playlists[playlist].songs[index][key] = metaData[key];
          }
        }
      }
    } else {
      /*
        Update the meta data for a song.
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            _config2.default.songs[index][key] = metaData[key];
          }
        }
      }
    }

    /*
      Display the updates on the screen.
    */
    _metaDataElements2.default.displayMetaData();
    _metaDataElements2.default.syncMetaData();
  }

  function setPlaylistMetaData(playlist, metaData) {
    if (_config2.default.playlists[playlist] != undefined) {
      /*
      These are the ignored keys that we won't be worrying about displaying.
      Every other key in the playlist object can be displayed.
      */
      var ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (ignoredKeys.indexOf(key) < 0) {
            _config2.default.playlists[playlist][key] = metaData[key];
          }
        }
      }

      _metaDataElements2.default.displayPlaylistMetaData();
    } else {
      _debug2.default.writeMessage("You must provide a valid playlist key!");
    }
  }

  /**
   * Sets the delay between the songs when they are finished.
   *
   * Public Accessor: Amplitude.setDelay()
   *
   * @access public
   * @param {number} delay 	- The millisecond delay time between songs
   */
  function setDelay(time) {
    _config2.default.delay = time;
  }

  /**
   * Returns the current delay between songs.
   *
   * Public Accessor: Amplitude.getDelay()
   *
   * @access public
   */
  function getDelay() {
    return _config2.default.delay;
  }

  /**
   * Returns the state of the player.
   *
   * Public Accessor: Amplitude.getPlayerState();
   */
  function getPlayerState() {
    return _config2.default.player_state;
  }

  /**
   * Registers a visualization and sets that visualization's
   * preferences. When creating a visualization, you can set certain
   * preferences that the user can overwrite similar to Amplitude.
   * Public Accessor: Amplitude.registerVisualization( visualization, preferences )
   *
   * @param {object} visualzation A visualization object that gets registered
   * with Amplitude
   *
   * @param {object} preferences A JSON object of preferences relating to the
   * visualization
   */
  function registerVisualization(visualization, preferences) {
    _visualizations2.default.register(visualization, preferences);
  }

  /**
   * Set the visualization for the playlist
   *
   * @param {string} playlist - The playlist we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setPlaylistVisualization(playlist, visualizationKey) {
    if (_config2.default.playlists[playlist] != undefined) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.playlists[playlist].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("The playlist for the key provided does not exist");
    }
  }

  /**
   * Set a visualization for the song.
   *
   * @param {number} songIndex - The index of the song in the songs array we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setSongVisualization(songIndex, visualizationKey) {
    if (_config2.default.songs[songIndex]) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.songs[songIndex].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("A song at that index is undefined");
    }
  }

  /**
   * Set song in playlist visualization.
   *
   * @param {string} playlist - The playlist we are setting the song visualization for.
   * @param {number} songIndex - The index we are setting the visualization for.
   * @param {strong} visualizationKey - The key of the visualization we are adding to the song in the playlist.
   */
  function setSongInPlaylistVisualization(playlist, songIndex, visualizationKey) {
    if (_config2.default.playlists[playlist].songs[songIndex] != undefined) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.playlists[playlist].songs[songIndex].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("The song in the playlist at that key is not defined");
    }
  }

  /**
   * Sets the global visualization default.
   */
  function setGlobalVisualization(visualizationKey) {
    if (_config2.default.visualizations.available[visualizationKey] != undefined) {
      _config2.default.visualization = visualizationKey;
    } else {
      _debug2.default.writeMessage("A visualization does not exist for the key provided.");
    }
  }

  /**
   * Sets the active volume.
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    _core2.default.setVolume(volumeLevel);
  }

  /**
   * Gets the active volume.
   */
  function getVolume() {
    return _config2.default.volume;
  }

  /*
  Returns all of the publically accesible methods.
  */
  return {
    init: init,
    getConfig: getConfig,
    bindNewElements: bindNewElements,
    getActivePlaylist: getActivePlaylist,
    getPlaybackSpeed: getPlaybackSpeed,
    setPlaybackSpeed: setPlaybackSpeed,
    getRepeat: getRepeat,
    getRepeatPlaylist: getRepeatPlaylist,
    getShuffle: getShuffle,
    getShufflePlaylist: getShufflePlaylist,
    setShuffle: setShuffle,
    setShufflePlaylist: setShufflePlaylist,
    setRepeat: setRepeat,
    setRepeatSong: setRepeatSong,
    setRepeatPlaylist: setRepeatPlaylist,
    getDefaultAlbumArt: getDefaultAlbumArt,
    setDefaultAlbumArt: setDefaultAlbumArt,
    getDefaultPlaylistArt: getDefaultPlaylistArt,
    setDefaultPlaylistArt: setDefaultPlaylistArt,
    getSongPlayedPercentage: getSongPlayedPercentage,
    setSongPlayedPercentage: setSongPlayedPercentage,
    getSongPlayedSeconds: getSongPlayedSeconds,
    getSongDuration: getSongDuration,
    setDebug: setDebug,
    getActiveSongMetadata: getActiveSongMetadata,
    getActivePlaylistMetadata: getActivePlaylistMetadata,
    getSongAtIndex: getSongAtIndex,
    getSongAtPlaylistIndex: getSongAtPlaylistIndex,
    addSong: addSong,
    prependSong: prependSong,
    addSongToPlaylist: addSongToPlaylist,
    removeSong: removeSong,
    removeSongFromPlaylist: removeSongFromPlaylist,
    playNow: playNow,
    playSongAtIndex: playSongAtIndex,
    playPlaylistSongAtIndex: playPlaylistSongAtIndex,
    play: play,
    pause: pause,
    stop: stop,
    getAudio: getAudio,
    getAnalyser: getAnalyser,
    next: next,
    prev: prev,
    getSongs: getSongs,
    getSongsInPlaylist: getSongsInPlaylist,
    getSongsState: getSongsState,
    getSongsStatePlaylist: getSongsStatePlaylist,
    getActiveIndex: getActiveIndex,
    getVersion: getVersion,
    getBuffered: getBuffered,
    skipTo: skipTo,
    setSongMetaData: setSongMetaData,
    setPlaylistMetaData: setPlaylistMetaData,
    setDelay: setDelay,
    getDelay: getDelay,
    getPlayerState: getPlayerState,
    addPlaylist: addPlaylist,
    registerVisualization: registerVisualization,
    setPlaylistVisualization: setPlaylistVisualization,
    setSongVisualization: setSongVisualization,
    setSongInPlaylistVisualization: setSongInPlaylistVisualization,
    setGlobalVisualization: setGlobalVisualization,
    getVolume: getVolume,
    setVolume: setVolume
  };
}();

/**
 * Playback Speed Elements
 * @module visual/PlaybackSpeedElements
 */


/**
 * Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Song Played Progress Elements
 * @module visual/SongPlayedProgressElements
 */


/**
 * Visual Repeat Elements
 * @module visual/RepeatElements
 */


/****************************************************
 * FX Modules
 ****************************************************/
/**
 * Imports the visualizations module
 * @module fx/Visualizations
 */


/**
 * Repeater Module
 *
 * @module utilities/Repeater
 */


/**
 * Imports the config state module.
 * @module ConfigState
 */


/****************************************************
 * Core
 ****************************************************/
/**
 * AmplitudeJS Core Module
 *
 * @module core/Core
 */
/**
 * @name 		AmplitudeJS
 * @author 	Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
/**
 * AmplitudeJS Initializer Module
 *
 * @module init/AmplitudeInitializer
 */
exports.default = Amplitude;
module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the initialization of the playlists.
 *
 * @module init/PlaylistsInitializer
 */


/**
 * AmplitudeJS Visual Meta Data Elements Module
 * @module visual/MetaDataElements
 */


/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
var PlaylistsInitializer = function () {
  /**
   * Initializes the playlists for AmplitudeJS
   *
   * @param {Object} playlists - The playlists defined by the user.
   */
  function initialize(playlists) {
    /*
      Copy the playlists over to Amplitude
    */
    _config2.default.playlists = playlists;

    /*
      Copy songs over from songs array.
    */
    copySongsToPlaylists();

    /*
      Grab any SoundCloud Data for the playlist songs if needed.
    */
    grabSoundCloudData();

    /*
      Initialize a scoped active index for each playlist.
    */
    initializePlaylistActiveIndexes();

    /*
      Initialize the shuffle status of the playlists.
    */
    initializePlaylistShuffleStatuses();

    /*
      Initialize the repeat status for the playlits.
    */
    initializePlaylistsRepeatStatuses();

    /*
      Initialize temporary place holders for shuffle lists.
    */
    initializePlaylistShuffleLists();

    /*
      Initializes the first song in the playlist
    */
    initializeFirstSongInPlaylistMetaData();
  }

  /**
   * Initializes a scoped active index for each playlist.
   *
   * @access private
   */
  function initializePlaylistActiveIndexes() {
    /*
    Iterate over all of the playlists defined by the user
      and add an active index.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].active_index = null;
    }
  }

  /**
   * Ensures the indexes in the playlists are valid indexes. The song has
   * to exist in the Amplitude config to be played correctly. If the index
   * is an integer, we ensure it exists and coy it to the array.
   *
   * @access private
   */
  function copySongsToPlaylists() {
    /*
      Iterate over all of the config's playlists
    */
    for (var key in _config2.default.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (_config2.default.playlists.hasOwnProperty(key)) {
        /*
          Checks if the playlist has songs.
        */
        if (_config2.default.playlists[key].songs) {
          /*
            Iterate over all of the songs in the playlist
          */
          for (var i = 0; i < _config2.default.playlists[key].songs.length; i++) {
            if (_checks2.default.isInt(_config2.default.playlists[key].songs[i])) {
              _config2.default.playlists[key].songs[i] = _config2.default.songs[_config2.default.playlists[key].songs[i]];

              _config2.default.playlists[key].songs[i].index = i;
            }
            /*
              Check to see if the index for the song in the playlist
              exists in the songs config.
            */
            if (_checks2.default.isInt(_config2.default.playlists[key].songs[i]) && !_config2.default.songs[_config2.default.playlists[key].songs[i]]) {
              _debug2.default.writeMessage("The song index: " + _config2.default.playlists[key].songs[i] + " in playlist with key: " + key + " is not defined in your songs array!");
            }

            /*
              If not an int, then is a dedicated song, just set the index.
            */
            if (!_checks2.default.isInt(_config2.default.playlists[key].songs[i])) {
              _config2.default.playlists[key].songs[i].index = i;
            }
          }
        }
      }
    }
  }

  /**
   * Grabs the SoundCloud data for any song in the playlist that
   * the user needs to grab data for.
   *
   * @access private
   */
  function grabSoundCloudData() {
    /*
      Iterate over all of the config's playlists
    */
    for (var key in _config2.default.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (_config2.default.playlists.hasOwnProperty(key)) {
        /*
          Iterate over all of the songs in the playlist and see if
          they need to grab the SoundCloud data for the song.
        */
        for (var i = 0; i < _config2.default.playlists[key].songs.length; i++) {
          /*
            Only Grab the data if the URL is a SoundCloud URL.
          */
          if (_soundcloud2.default.isSoundCloudURL(_config2.default.playlists[key].songs[i].url)) {
            /*
              Only grab the data if the SoundCloud data has not already been
              grabbed for the audio. This could happen if the user defined the
              song in the songs array and was grabbed before.
            */
            if (_config2.default.playlists[key].songs[i].soundcloud_data == undefined) {
              _soundcloud2.default.resolveIndividualStreamableURL(_config2.default.playlists[key].songs[i].url, key, i);
            }
          }
        }
      }
    }
  }

  /**
   * Initializes the shuffle statuses for each of the playlists. These will
   * be referenced when we shuffle individual playlists.
   *
   * @access private
   */
  function initializePlaylistShuffleStatuses() {
    /*
    Iterate over all of the playlists the user defined adding
    the playlist key to the shuffled playlist array and creating
    and empty object to house the statuses.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].shuffle = false;
    }
  }

  /**
   * Initializes the repeat statuses for each of the playlists.  These will
   * be referenced when we repeat individual playlits.
   *
   * @access private
   */
  function initializePlaylistsRepeatStatuses() {
    /*
      Iterate over all of the playlists the user defined adding
      the playlist key to the repeated playlist array and creating
      and empty object to house the statuses.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].repeat = false;
    }
  }

  /**
   * Initializes the shuffled playlist placeholders. These will be set for
   * playlists that are shuffled and contain the shuffled songs.
   *
   * @access private
   */
  function initializePlaylistShuffleLists() {
    /*
    Iterate over all of the playlists the user defined adding
    the playlist key to the shuffled playlists array and creating
    and empty object to house the shuffled playlists
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].shuffle_list = [];
    }
  }

  /**
   * Intializes the display for the first song in the playlist meta data.
   *
   * @access private
   */
  function initializeFirstSongInPlaylistMetaData() {
    /*
    Iterates over all of the playlists setting the meta data for the
    first song.
    */
    for (var key in _config2.default.playlists) {
      _metaDataElements2.default.setFirstSongInPlaylist(_config2.default.playlists[key].songs[0], key);
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    initialize: initialize
  };
}();

/**
 * AmplitudeJS SoundCloud Meta module
 * @module soundcloud/Soundcloud
 */


/**
 * AmplitudeJS Checks Utility.
 * @module utilities/Checks
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = PlaylistsInitializer;
module.exports = exports["default"];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the container elements.
 *
 * @param visual/ContainerElements
 */
var ContainerElements = function () {
  /**
   * Applies the class 'amplitude-active-song-container' to the element
   * containing visual information regarding the active song.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not.
   *
   * @access public
   */
  function setActive(direct) {
    /*
      Gets all of the song container elements.
    */
    var songContainers = document.getElementsByClassName("amplitude-song-container");

    /*
    Removes all of the active song containrs.
    */
    for (var i = 0; i < songContainers.length; i++) {
      songContainers[i].classList.remove("amplitude-active-song-container");
    }

    /*
    Finds the active index and adds the active song container to the element
    that represents the song at the index.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      var activeIndex = "";

      /*
        If we click directly on the song element, we ignore
        whether it's in shuffle or not.
      */
      if (direct) {
        activeIndex = _config2.default.active_index;
      } else {
        if (_config2.default.shuffle_on) {
          activeIndex = _config2.default.shuffle_list[_config2.default.active_index].index;
        } else {
          activeIndex = _config2.default.active_index;
        }
      }

      if (document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activeIndex + '"]')) {
        var _songContainers = document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activeIndex + '"]');

        for (var _i = 0; _i < _songContainers.length; _i++) {
          if (!_songContainers[_i].hasAttribute("data-amplitude-playlist")) {
            _songContainers[_i].classList.add("amplitude-active-song-container");
          }
        }
      }
    } else {
      /*
        If we have an active playlist or the action took place directly on the
        song element, we ignore the shuffle.
      */
      if (_config2.default.active_playlist != null && _config2.default.active_playlist != "" || direct) {
        var activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].active_index;
      } else {
        var activePlaylistIndex = "";

        if (_config2.default.playlists[_config2.default.active_playlist].shuffle) {
          activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].shuffle_list[_config2.default.playlists[_config2.default.active_playlist].active_index].index;
        } else {
          activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].active_index;
        }
      }

      if (document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]')) {
        var _songContainers2 = document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

        for (var _i2 = 0; _i2 < _songContainers2.length; _i2++) {
          _songContainers2[_i2].classList.add("amplitude-active-song-container");
        }
      }
    }
  }

  return {
    setActive: setActive
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ContainerElements;
module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time hour elements.
 *
 * @module visual/time/CurrentHourElements
 */
var CurrentHourElements = function () {
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Updates any elements that display the current hour for the song.
   *
   * @access public
   * @param {number} hours 	- An integer conaining how many hours into the song.
   */
  function syncGlobal(hours) {
    /*
    Get all of the hour selectors
    */
    var currentHourSelectors = document.querySelectorAll(".amplitude-current-hours");

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourSelectors.length; i++) {
      var playlist = currentHourSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentHourSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current hour selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist current hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncPlaylist(hours) {
    /*
    Get all of the hour selectors
    */
    var currentHourPlaylistSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourPlaylistSelectors.length; i++) {
      var songIndex = currentHourPlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current hour selector for a global display.
      */
      if (songIndex == null) {
        currentHourPlaylistSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSong(hours) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the hour selectors
      */
      var currentHourSongSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current hour selector's inner html to hours passed in.
      */
      for (var i = 0; i < currentHourSongSelectors.length; i++) {
        var playlist = currentHourSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current hour selector for a global display.
        */
        if (playlist == null) {
          currentHourSongSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSongInPlaylist(hours) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the hour selectors
    */
    var currentHourPlaylistSongSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourPlaylistSongSelectors.length; i++) {
      currentHourPlaylistSongSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Reset the current hour elements.
   */
  function resetTimes() {
    /*
      Gets the hour display elements
    */
    var hourSelectors = document.querySelectorAll(".amplitude-current-hours");

    /*
      Iterates over all of the hour selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < hourSelectors.length; i++) {
      hourSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentHourElements;
module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time minutes elements.
 *
 * @module visual/time/CurrentMinuteElements
 */
var CurrentMinuteElements = function () {
  /**
   * Syncs the current minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  /**
   * Syncs the global current minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncGlobal(minutes) {
    /*
    Get all of the minute selectors
    */
    var currentMinuteSelectors = document.querySelectorAll(".amplitude-current-minutes");

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinuteSelectors.length; i++) {
      var playlist = currentMinuteSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current minute selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the playlist minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncPlaylist(minutes) {
    /*
    Get all of the minute selectors
    */
    var currentMinutePlaylistSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinutePlaylistSelectors.length; i++) {
      var songIndex = currentMinutePlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current minute selector for a global display.
      */
      if (songIndex == null) {
        currentMinutePlaylistSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the current song minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncSong(minutes) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the minute selectors
      */
      var currentMinuteSongSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current minute selector's inner html to minutes passed in.
      */
      for (var i = 0; i < currentMinuteSongSelectors.length; i++) {
        var playlist = currentMinuteSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current minute selector for a global display.
        */
        if (playlist == null) {
          currentMinuteSongSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  /**
   * Syncs the current song in playlist minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncSongInPlaylist(minutes) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Get all of the minute selectors
    */
    var currentMinutePlaylistSongSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinutePlaylistSongSelectors.length; i++) {
      currentMinutePlaylistSongSelectors[i].innerHTML = minutes;
    }
  }

  /**
   * Reset the current times.
   */
  function resetTimes() {
    /*
      Gets the minute display elements
    */
    var minuteSelectors = document.querySelectorAll(".amplitude-current-minutes");

    /*
      Iterates over all of the minute selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < minuteSelectors.length; i++) {
      minuteSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentMinuteElements;
module.exports = exports["default"];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time seconds elements.
 *
 * @module visual/time/CurrentSecondElements
 */
var CurrentSecondElements = function () {
  /**
   * Syncs the current seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  /**
   * Syncs the global current seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncGlobal(seconds) {
    /*
    Get all of the second selectors
    */
    var currentSecondSelectors = document.querySelectorAll(".amplitude-current-seconds");

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondSelectors.length; i++) {
      var playlist = currentSecondSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentSecondSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current second selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the playlist seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncPlaylist(seconds) {
    /*
    Get all of the second selectors
    */
    var currentSecondPlaylistSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondPlaylistSelectors.length; i++) {
      var songIndex = currentSecondPlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current second selector for a global display.
      */
      if (songIndex == null) {
        currentSecondPlaylistSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the current song seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncSong(seconds) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the second selectors
      */
      var currentSecondSongSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current second selector's inner html to seconds passed in.
      */
      for (var i = 0; i < currentSecondSongSelectors.length; i++) {
        var playlist = currentSecondSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current second selector for a global display.
        */
        if (playlist == null) {
          currentSecondSongSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  /**
   * Syncs the current song in playlist seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncSongInPlaylist(seconds) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the second selectors
    */
    var currentSecondPlaylistSongSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondPlaylistSongSelectors.length; i++) {
      currentSecondPlaylistSongSelectors[i].innerHTML = seconds;
    }
  }

  /**
   * Reset the current seconds elements.
   */
  function resetTimes() {
    /*
      Gets the second display elements
    */
    var secondSelectors = document.querySelectorAll(".amplitude-current-seconds");

    /*
      Iterates over all of the second selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < secondSelectors.length; i++) {
      secondSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentSecondElements;
module.exports = exports["default"];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help sync visual time elements.
 *
 * @module visual/CurrentTimeElements
 */
var CurrentTimeElements = function () {
  /**
   * Visually displays the current time on the screen. This is called on
   * time update for the current song.
   *
   * @access public
   * @param {object} currentTime 					- An object containing the current time for the song in seconds, minutes, and hours.
   */
  function sync(currentTime) {
    /*
    Set current time display.
    */
    syncGlobal(currentTime);
    syncPlaylist(currentTime);
    syncSong(currentTime);
    syncSongInPlaylist(currentTime);
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncGlobal(time) {
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll(".amplitude-current-time");

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      var playlist = currentTimeSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncPlaylist(time) {
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      var songIndex = currentTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSong(time) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the time selectors.
      */
      var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the time selector's inner html to the current time for the song. The current
      time is computed by joining minutes and seconds.
      */
      var timeText = time.minutes + ":" + time.seconds;

      if (time.hours > 0) {
        timeText = time.hours + ":" + timeText;
      }

      for (var i = 0; i < currentTimeSelectors.length; i++) {
        var playlist = currentTimeSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          currentTimeSelectors[i].innerHTML = timeText;
        }
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSongInPlaylist(time) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      currentTimeSelectors[i].innerHTML = timeText;
    }
  }

  /**
   * Resets the current time displays to 00:00
   *
   * @access public
   */
  function resetTimes() {
    /*
    Gets the time selector display elements
    */
    var timeSelectors = document.querySelectorAll(".amplitude-current-time");

    /*
    Iterates over all of the time selectors and sets the inner HTML
    to 00.
    */
    for (var i = 0; i < timeSelectors.length; i++) {
      timeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Returns the publically facing methods
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentTimeElements;
module.exports = exports["default"];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration countdown elements.
 *
 * @module visual/time/DurationCountDownTimeElements.
 */
var DurationCountDownTimeElements = function () {
  /**
   * Syncs all of the countdown time elements.
   *
   * @param {object} countDownTime - The current time of the audio.
   * @param {object} songDuration - The song duration of the audio.
   */
  function sync(countDownTime, songDuration) {
    var timeRemaining = computeTimeRemaining(countDownTime, songDuration);

    syncGlobal(timeRemaining);
    syncPlaylist(timeRemaining);
    syncSong(timeRemaining);
    syncSongInPlaylist(timeRemaining);
  }

  /**
   * Syncs the global count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncGlobal(timeRemaining) {
    var durationTimeRemainingSelectors = document.querySelectorAll(".amplitude-time-remaining");

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      var playlist = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
      }
    }
  }

  /**
   * Syncs the playlist count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncPlaylist(timeRemaining) {
    var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      var songIndex = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
      }
    }
  }

  /**
   * Syncs the song count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncSong(timeRemaining) {
    if (_config2.default.active_playlist == null) {
      var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
        var playlist = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncSongInPlaylist(timeRemaining) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
    }
  }

  /**
   * Resets the count down times.
   */
  function resetTimes() {
    var durationTimeRemainingSelectors = document.querySelectorAll(".amplitude-time-remaining");

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      durationTimeRemainingSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Computes the time remaining for the audio.
   *
   * @param {object} currentTime - The current time of the audio.
   * @param {object} songDuration - The duration of the audio.
   */
  function computeTimeRemaining(currentTime, songDuration) {
    var timeRemaining = "00:00";

    /*
      Initialize the total current seconds and total duration seconds
    */
    var totalCurrentSeconds = parseInt(currentTime.seconds) + parseInt(currentTime.minutes) * 60 + parseInt(currentTime.hours) * 60 * 60;
    var totalDurationSeconds = parseInt(songDuration.seconds) + parseInt(songDuration.minutes) * 60 + parseInt(songDuration.hours) * 60 * 60;

    /*
      If the two variables are numbers we continue the computing.
    */
    if (!isNaN(totalCurrentSeconds) && !isNaN(totalDurationSeconds)) {
      /*
        Find the total remaining seconds.
      */
      var timeRemainingTotalSeconds = totalDurationSeconds - totalCurrentSeconds;

      var remainingHours = Math.floor(timeRemainingTotalSeconds / 3600);
      var remainingMinutes = Math.floor((timeRemainingTotalSeconds - remainingHours * 3600) / 60);
      var remainingSeconds = timeRemainingTotalSeconds - remainingHours * 3600 - remainingMinutes * 60;

      timeRemaining = (remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes) + ":" + (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds);

      if (remainingHours > 0) {
        timeRemaining = remainingHours + ":" + timeRemaining;
      }
    }

    return timeRemaining;
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationCountDownTimeElements;
module.exports = exports["default"];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration hours elements.
 *
 * @module visual/time/DurationHourElements.
 */
var DurationHourElements = function () {
  /**
   * Sync the duration hours elements.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Syncs the global duration hours elements.
   *
   * @param {Integer} hours - the duration hours for the audio.
   */
  function syncGlobal(hours) {
    var durationHourSelectors = document.querySelectorAll(".amplitude-duration-hours");

    for (var i = 0; i < durationHourSelectors.length; i++) {
      var playlist = durationHourSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationHourSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist duration hours for the audio.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncPlaylist(hours) {
    var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationHourSelectors.length; i++) {
      var songIndex = durationHourSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song duration hours.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncSong(hours) {
    if (_config2.default.active_playlist == null) {
      var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationHourSelectors.length; i++) {
        var playlist = durationHourSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationHourSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration hours.
   *
   * @param {Integer} hours - The duration hours of the audio.
   */
  function syncSongInPlaylist(hours) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Resets the duration shours elements to '00'
   */
  function resetTimes() {
    var durationHourSelectors = document.querySelectorAll(".amplitude-duration-hours");

    for (var i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationHourElements;
module.exports = exports["default"];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration minutes elements.
 *
 * @module visual/time/DurationMinuteElements.
 */
var DurationMinuteElements = function () {
  /**
   * Sync the duration minutes elements.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  /**
   * Syncs the global duration minutes elements.
   *
   * @param {Integer} minutes - the duration minutes for the audio.
   */
  function syncGlobal(minutes) {
    var durationMinuteSelectors = document.querySelectorAll(".amplitude-duration-minutes");

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      var playlist = durationMinuteSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the playlist duration minutes for the audio.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncPlaylist(minutes) {
    var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      var songIndex = durationMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the song duration minutes.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncSong(minutes) {
    if (_config2.default.active_playlist == null) {
      var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationMinuteSelectors.length; i++) {
        var playlist = durationMinuteSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationMinuteSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration minutes.
   *
   * @param {Integer} minutes - The duration minutes of the audio.
   */
  function syncSongInPlaylist(minutes) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = minutes;
    }
  }

  /**
   * Resets the duration minutes elements to '00'
   */
  function resetTimes() {
    var durationMinuteSelectors = document.querySelectorAll(".amplitude-duration-minutes");

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationMinuteElements;
module.exports = exports["default"];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration seconds elements.
 *
 * @module visual/time/DurationSecondElements.
 */
var DurationSecondElements = function () {
  /**
   * Sync the duration seconds elements.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  /**
   * Syncs the global duration seconds elements.
   *
   * @param {Integer} seconds - the duration seconds for the audio.
   */
  function syncGlobal(seconds) {
    var durationSecondSelectors = document.querySelectorAll(".amplitude-duration-seconds");

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      var playlist = durationSecondSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationSecondSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the playlist duration seconds for the audio.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncPlaylist(seconds) {
    var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      var songIndex = durationSecondSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the song duration seconds.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncSong(seconds) {
    if (_config2.default.active_playlist == null) {
      var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationSecondSelectors.length; i++) {
        var playlist = durationSecondSelectors[i].getAttribute("data--amplitude-playlist");

        if (playlist == null) {
          durationSecondSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration seconds.
   *
   * @param {Integer} seconds - The duration seconds of the audio.
   */
  function syncSongInPlaylist(seconds) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = seconds;
    }
  }

  /**
   * Resets the duration seconds elements to '00'
   */
  function resetTimes() {
    var durationSecondSelectors = document.querySelectorAll(".amplitude-duration-seconds");

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationSecondElements;
module.exports = exports["default"];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration time elements.
 *
 * @module visual/time/DurationTimeElements.
 */
var DurationTimeElements = function () {
  /**
   * Syncs the duration time for all elements.
   *
   * @param {Object} durationTime - The object containing all of the song duration times.
   */
  function sync(durationTime) {
    var durationText = computeDurationText(durationTime);

    syncGlobal(durationText);
    syncPlaylist(durationText);
    syncSong(durationText);
    syncSongInPlaylist(durationText);
  }

  /**
   * Sync the global song duration elements.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncGlobal(durationText) {
    var durationTimeSelectors = document.querySelectorAll(".amplitude-duration-time");

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      var playlist = durationTimeSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the playlist duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncPlaylist(durationText) {
    var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      var songIndex = durationTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the song duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncSong(durationText) {
    if (_config2.default.active_playlist == null) {
      var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationTimeSelectors.length; i++) {
        var playlist = durationTimeSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationTimeSelectors[i].innerHTML = durationText;
        }
      }
    }
  }

  /**
   * Sync the song in playlist duration times.
   *
   * @param {Object} durationText - An object containing the duration text.
   */
  function syncSongInPlaylist(durationText) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = durationText;
    }
  }

  /**
   * Resets all of the duration times to empty.
   */
  function resetTimes() {
    var durationTimeSelectors = document.querySelectorAll(".amplitude-duration-time");

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Computes the duration text
   *
   * @param {Object} durationTime - An object containint the duration times.
   */
  function computeDurationText(durationTime) {
    var durationText = "00:00";

    if (!isNaN(durationTime.minutes) && !isNaN(durationTime.seconds)) {
      durationText = durationTime.minutes + ":" + durationTime.seconds;
      if (!isNaN(durationTime.hours) && durationTime.hours > 0) {
        durationText = durationTime.hours + ":" + durationText;
      }
    }

    return durationText;
  }

  /**
   * Return publically accessible methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationTimeElements;
module.exports = exports["default"];

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {"name":"amplitudejs","version":"5.3.2","description":"A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://521dimensions.com/open-source/amplitudejs","main":"dist/amplitude.js","devDependencies":{"babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-plugin-add-module-exports":"0.2.1","babel-polyfill":"^6.26.0","babel-preset-es2015":"^6.18.0","husky":"^1.3.1","jest":"^23.6.0","prettier":"1.15.1","pretty-quick":"^1.11.1","watch":"^1.0.2","webpack":"^2.7.0"},"directories":{"doc":"docs"},"files":["dist"],"funding":{"type":"opencollective","url":"https://opencollective.com/amplitudejs"},"scripts":{"build":"node_modules/.bin/webpack","prettier":"npx pretty-quick","preversion":"npx pretty-quick && npm run test","postversion":"git push && git push --tags","test":"jest","version":"npm run build && git add -A dist"},"repository":{"type":"git","url":"git+https://github.com/521dimensions/amplitudejs.git"},"keywords":["webaudio","html5","javascript","audio-player"],"author":"521 Dimensions (https://521dimensions.com)","license":"MIT","bugs":{"url":"https://github.com/521dimensions/amplitudejs/issues"},"homepage":"https://github.com/521dimensions/amplitudejs#readme"}

/***/ })
/******/ ]);
});
//# sourceMappingURL=amplitude.js.map
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,i;function c(){return e.apply(null,arguments)}function o(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function u(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function l(e){return void 0===e}function h(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function d(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function f(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function m(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function _(e,t){for(var n in t)m(t,n)&&(e[n]=t[n]);return m(t,"toString")&&(e.toString=t.toString),m(t,"valueOf")&&(e.valueOf=t.valueOf),e}function y(e,t,n,s){return Tt(e,t,n,s,!0).utc()}function g(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function v(e){if(null==e._isValid){var t=g(e),n=i.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function p(e){var t=y(NaN);return null!=e?_(g(t),e):g(t).userInvalidated=!0,t}i=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var r=c.momentProperties=[];function w(e,t){var n,s,i;if(l(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),l(t._i)||(e._i=t._i),l(t._f)||(e._f=t._f),l(t._l)||(e._l=t._l),l(t._strict)||(e._strict=t._strict),l(t._tzm)||(e._tzm=t._tzm),l(t._isUTC)||(e._isUTC=t._isUTC),l(t._offset)||(e._offset=t._offset),l(t._pf)||(e._pf=g(t)),l(t._locale)||(e._locale=t._locale),0<r.length)for(n=0;n<r.length;n++)l(i=t[s=r[n]])||(e[s]=i);return e}var t=!1;function M(e){w(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===t&&(t=!0,c.updateOffset(this),t=!1)}function k(e){return e instanceof M||null!=e&&null!=e._isAMomentObject}function S(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function D(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=S(t)),n}function a(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&D(e[s])!==D(t[s]))&&a++;return a+r}function Y(e){!1===c.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function n(i,r){var a=!0;return _(function(){if(null!=c.deprecationHandler&&c.deprecationHandler(null,i),a){for(var e,t=[],n=0;n<arguments.length;n++){if(e="","object"==typeof arguments[n]){for(var s in e+="\n["+n+"] ",arguments[0])e+=s+": "+arguments[0][s]+", ";e=e.slice(0,-2)}else e=arguments[n];t.push(e)}Y(i+"\nArguments: "+Array.prototype.slice.call(t).join("")+"\n"+(new Error).stack),a=!1}return r.apply(this,arguments)},r)}var s,O={};function T(e,t){null!=c.deprecationHandler&&c.deprecationHandler(e,t),O[e]||(Y(t),O[e]=!0)}function b(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function x(e,t){var n,s=_({},e);for(n in t)m(t,n)&&(u(e[n])&&u(t[n])?(s[n]={},_(s[n],e[n]),_(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)m(e,n)&&!m(t,n)&&u(e[n])&&(s[n]=_({},s[n]));return s}function P(e){null!=e&&this.set(e)}c.suppressDeprecationWarnings=!1,c.deprecationHandler=null,s=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)m(e,t)&&n.push(t);return n};var W={};function C(e,t){var n=e.toLowerCase();W[n]=W[n+"s"]=W[t]=e}function H(e){return"string"==typeof e?W[e]||W[e.toLowerCase()]:void 0}function R(e){var t,n,s={};for(n in e)m(e,n)&&(t=H(n))&&(s[t]=e[n]);return s}var U={};function F(e,t){U[e]=t}function L(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(0<=e?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,G=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,V={},E={};function I(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(E[e]=i),t&&(E[t[0]]=function(){return L(i.apply(this,arguments),t[1],t[2])}),n&&(E[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function A(e,t){return e.isValid()?(t=j(t,e.localeData()),V[t]=V[t]||function(s){var e,i,t,r=s.match(N);for(e=0,i=r.length;e<i;e++)E[r[e]]?r[e]=E[r[e]]:r[e]=(t=r[e]).match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");return function(e){var t,n="";for(t=0;t<i;t++)n+=b(r[t])?r[t].call(e,s):r[t];return n}}(t),V[t](e)):e.localeData().invalidDate()}function j(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(G.lastIndex=0;0<=n&&G.test(e);)e=e.replace(G,s),G.lastIndex=0,n-=1;return e}var Z=/\d/,z=/\d\d/,$=/\d{3}/,q=/\d{4}/,J=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d\d\d\d?/,X=/\d\d\d\d\d\d?/,K=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ne=/\d+/,se=/[+-]?\d+/,ie=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,oe={};function ue(e,n,s){oe[e]=b(n)?n:function(e,t){return e&&s?s:n}}function le(e,t){return m(oe,e)?oe[e](t._strict,t._locale):new RegExp(he(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function he(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var de={};function ce(e,n){var t,s=n;for("string"==typeof e&&(e=[e]),h(n)&&(s=function(e,t){t[n]=D(e)}),t=0;t<e.length;t++)de[e[t]]=s}function fe(e,i){ce(e,function(e,t,n,s){n._w=n._w||{},i(e,n._w,n,s)})}var me=0,_e=1,ye=2,ge=3,ve=4,pe=5,we=6,Me=7,ke=8;function Se(e){return De(e)?366:365}function De(e){return e%4==0&&e%100!=0||e%400==0}I("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),I(0,["YY",2],0,function(){return this.year()%100}),I(0,["YYYY",4],0,"year"),I(0,["YYYYY",5],0,"year"),I(0,["YYYYYY",6,!0],0,"year"),C("year","y"),F("year",1),ue("Y",se),ue("YY",B,z),ue("YYYY",ee,q),ue("YYYYY",te,J),ue("YYYYYY",te,J),ce(["YYYYY","YYYYYY"],me),ce("YYYY",function(e,t){t[me]=2===e.length?c.parseTwoDigitYear(e):D(e)}),ce("YY",function(e,t){t[me]=c.parseTwoDigitYear(e)}),ce("Y",function(e,t){t[me]=parseInt(e,10)}),c.parseTwoDigitYear=function(e){return D(e)+(68<D(e)?1900:2e3)};var Ye,Oe=Te("FullYear",!0);function Te(t,n){return function(e){return null!=e?(xe(this,t,e),c.updateOffset(this,n),this):be(this,t)}}function be(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function xe(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&De(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Pe(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function Pe(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1===s?De(e)?29:28:31-s%7%2}Ye=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},I("M",["MM",2],"Mo",function(){return this.month()+1}),I("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),I("MMMM",0,0,function(e){return this.localeData().months(this,e)}),C("month","M"),F("month",8),ue("M",B),ue("MM",B,z),ue("MMM",function(e,t){return t.monthsShortRegex(e)}),ue("MMMM",function(e,t){return t.monthsRegex(e)}),ce(["M","MM"],function(e,t){t[_e]=D(e)-1}),ce(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[_e]=i:g(n).invalidMonth=e});var We=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Ce="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var He="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Re(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=D(t);else if(!h(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),Pe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Ue(e){return null!=e?(Re(this,e),c.updateOffset(this,!0),this):be(this,"Month")}var Fe=ae;var Le=ae;function Ne(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=y([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=he(s[t]),i[t]=he(i[t]);for(t=0;t<24;t++)r[t]=he(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Ge(e){var t;if(e<100&&0<=e){var n=Array.prototype.slice.call(arguments);n[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)}else t=new Date(Date.UTC.apply(null,arguments));return t}function Ve(e,t,n){var s=7+t-n;return-((7+Ge(e,0,s).getUTCDay()-t)%7)+s-1}function Ee(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+Ve(e,s,i);return a=o<=0?Se(r=e-1)+o:o>Se(e)?(r=e+1,o-Se(e)):(r=e,o),{year:r,dayOfYear:a}}function Ie(e,t,n){var s,i,r=Ve(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+Ae(i=e.year()-1,t,n):a>Ae(e.year(),t,n)?(s=a-Ae(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function Ae(e,t,n){var s=Ve(e,t,n),i=Ve(e+1,t,n);return(Se(e)-s+i)/7}I("w",["ww",2],"wo","week"),I("W",["WW",2],"Wo","isoWeek"),C("week","w"),C("isoWeek","W"),F("week",5),F("isoWeek",5),ue("w",B),ue("ww",B,z),ue("W",B),ue("WW",B,z),fe(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=D(e)});function je(e,t){return e.slice(t,7).concat(e.slice(0,t))}I("d",0,"do","day"),I("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),I("e",0,0,"weekday"),I("E",0,0,"isoWeekday"),C("day","d"),C("weekday","e"),C("isoWeekday","E"),F("day",11),F("weekday",11),F("isoWeekday",11),ue("d",B),ue("e",B),ue("E",B),ue("dd",function(e,t){return t.weekdaysMinRegex(e)}),ue("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ue("dddd",function(e,t){return t.weekdaysRegex(e)}),fe(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:g(n).invalidWeekday=e}),fe(["d","e","E"],function(e,t,n,s){t[s]=D(e)});var Ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var ze="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var $e="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var qe=ae;var Je=ae;var Be=ae;function Qe(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=y([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=he(o[t]),u[t]=he(u[t]),l[t]=he(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Xe(){return this.hours()%12||12}function Ke(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function et(e,t){return t._meridiemParse}I("H",["HH",2],0,"hour"),I("h",["hh",2],0,Xe),I("k",["kk",2],0,function(){return this.hours()||24}),I("hmm",0,0,function(){return""+Xe.apply(this)+L(this.minutes(),2)}),I("hmmss",0,0,function(){return""+Xe.apply(this)+L(this.minutes(),2)+L(this.seconds(),2)}),I("Hmm",0,0,function(){return""+this.hours()+L(this.minutes(),2)}),I("Hmmss",0,0,function(){return""+this.hours()+L(this.minutes(),2)+L(this.seconds(),2)}),Ke("a",!0),Ke("A",!1),C("hour","h"),F("hour",13),ue("a",et),ue("A",et),ue("H",B),ue("h",B),ue("k",B),ue("HH",B,z),ue("hh",B,z),ue("kk",B,z),ue("hmm",Q),ue("hmmss",X),ue("Hmm",Q),ue("Hmmss",X),ce(["H","HH"],ge),ce(["k","kk"],function(e,t,n){var s=D(e);t[ge]=24===s?0:s}),ce(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ce(["h","hh"],function(e,t,n){t[ge]=D(e),g(n).bigHour=!0}),ce("hmm",function(e,t,n){var s=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s)),g(n).bigHour=!0}),ce("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s,2)),t[pe]=D(e.substr(i)),g(n).bigHour=!0}),ce("Hmm",function(e,t,n){var s=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s))}),ce("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s,2)),t[pe]=D(e.substr(i))});var tt,nt=Te("Hours",!0),st={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Ce,monthsShort:He,week:{dow:0,doy:6},weekdays:Ze,weekdaysMin:$e,weekdaysShort:ze,meridiemParse:/[ap]\.?m?\.?/i},it={},rt={};function at(e){return e?e.toLowerCase().replace("_","-"):e}function ot(e){var t=null;if(!it[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=tt._abbr,require("./locale/"+e),ut(t)}catch(e){}return it[e]}function ut(e,t){var n;return e&&((n=l(t)?ht(e):lt(e,t))?tt=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),tt._abbr}function lt(e,t){if(null===t)return delete it[e],null;var n,s=st;if(t.abbr=e,null!=it[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=it[e]._config;else if(null!=t.parentLocale)if(null!=it[t.parentLocale])s=it[t.parentLocale]._config;else{if(null==(n=ot(t.parentLocale)))return rt[t.parentLocale]||(rt[t.parentLocale]=[]),rt[t.parentLocale].push({name:e,config:t}),null;s=n._config}return it[e]=new P(x(s,t)),rt[e]&&rt[e].forEach(function(e){lt(e.name,e.config)}),ut(e),it[e]}function ht(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return tt;if(!o(e)){if(t=ot(e))return t;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=at(e[r]).split("-")).length,n=(n=at(e[r+1]))?n.split("-"):null;0<t;){if(s=ot(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&a(i,n,!0)>=t-1)break;t--}r++}return tt}(e)}function dt(e){var t,n=e._a;return n&&-2===g(e).overflow&&(t=n[_e]<0||11<n[_e]?_e:n[ye]<1||n[ye]>Pe(n[me],n[_e])?ye:n[ge]<0||24<n[ge]||24===n[ge]&&(0!==n[ve]||0!==n[pe]||0!==n[we])?ge:n[ve]<0||59<n[ve]?ve:n[pe]<0||59<n[pe]?pe:n[we]<0||999<n[we]?we:-1,g(e)._overflowDayOfYear&&(t<me||ye<t)&&(t=ye),g(e)._overflowWeeks&&-1===t&&(t=Me),g(e)._overflowWeekday&&-1===t&&(t=ke),g(e).overflow=t),e}function ct(e,t,n){return null!=e?e:null!=t?t:n}function ft(e){var t,n,s,i,r,a=[];if(!e._d){var o,u;for(o=e,u=new Date(c.now()),s=o._useUTC?[u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate()]:[u.getFullYear(),u.getMonth(),u.getDate()],e._w&&null==e._a[ye]&&null==e._a[_e]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ct(t.GG,e._a[me],Ie(bt(),1,4).year),s=ct(t.W,1),((i=ct(t.E,1))<1||7<i)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=Ie(bt(),r,a);n=ct(t.gg,e._a[me],l.year),s=ct(t.w,l.week),null!=t.d?((i=t.d)<0||6<i)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||6<t.e)&&(u=!0)):i=r}s<1||s>Ae(n,r,a)?g(e)._overflowWeeks=!0:null!=u?g(e)._overflowWeekday=!0:(o=Ee(n,s,i,r,a),e._a[me]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(r=ct(e._a[me],s[me]),(e._dayOfYear>Se(r)||0===e._dayOfYear)&&(g(e)._overflowDayOfYear=!0),n=Ge(r,0,e._dayOfYear),e._a[_e]=n.getUTCMonth(),e._a[ye]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=a[t]=s[t];for(;t<7;t++)e._a[t]=a[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ge]&&0===e._a[ve]&&0===e._a[pe]&&0===e._a[we]&&(e._nextDay=!0,e._a[ge]=0),e._d=(e._useUTC?Ge:function(e,t,n,s,i,r,a){var o;return e<100&&0<=e?(o=new Date(e+400,t,n,s,i,r,a),isFinite(o.getFullYear())&&o.setFullYear(e)):o=new Date(e,t,n,s,i,r,a),o}).apply(null,a),i=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ge]=24),e._w&&void 0!==e._w.d&&e._w.d!==i&&(g(e).weekdayMismatch=!0)}}var mt=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,_t=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,yt=/Z|[+-]\d\d(?::?\d\d)?/,gt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],vt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],pt=/^\/?Date\((\-?\d+)/i;function wt(e){var t,n,s,i,r,a,o=e._i,u=mt.exec(o)||_t.exec(o);if(u){for(g(e).iso=!0,t=0,n=gt.length;t<n;t++)if(gt[t][1].exec(u[1])){i=gt[t][0],s=!1!==gt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=vt.length;t<n;t++)if(vt[t][1].exec(u[3])){r=(u[2]||" ")+vt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!yt.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),Yt(e)}else e._isValid=!1}var Mt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function kt(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),He.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}var St={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Dt(e){var t,n,s,i=Mt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(i){var r=kt(i[4],i[3],i[2],i[5],i[6],i[7]);if(t=i[1],n=r,s=e,t&&ze.indexOf(t)!==new Date(n[0],n[1],n[2]).getDay()&&(g(s).weekdayMismatch=!0,!(s._isValid=!1)))return;e._a=r,e._tzm=function(e,t,n){if(e)return St[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(i[8],i[9],i[10]),e._d=Ge.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),g(e).rfc2822=!0}else e._isValid=!1}function Yt(e){if(e._f!==c.ISO_8601)if(e._f!==c.RFC_2822){e._a=[],g(e).empty=!0;var t,n,s,i,r,a,o,u,l=""+e._i,h=l.length,d=0;for(s=j(e._f,e._locale).match(N)||[],t=0;t<s.length;t++)i=s[t],(n=(l.match(le(i,e))||[])[0])&&(0<(r=l.substr(0,l.indexOf(n))).length&&g(e).unusedInput.push(r),l=l.slice(l.indexOf(n)+n.length),d+=n.length),E[i]?(n?g(e).empty=!1:g(e).unusedTokens.push(i),a=i,u=e,null!=(o=n)&&m(de,a)&&de[a](o,u._a,u,a)):e._strict&&!n&&g(e).unusedTokens.push(i);g(e).charsLeftOver=h-d,0<l.length&&g(e).unusedInput.push(l),e._a[ge]<=12&&!0===g(e).bigHour&&0<e._a[ge]&&(g(e).bigHour=void 0),g(e).parsedDateParts=e._a.slice(0),g(e).meridiem=e._meridiem,e._a[ge]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):(null!=e.isPM&&((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0)),t)}(e._locale,e._a[ge],e._meridiem),ft(e),dt(e)}else Dt(e);else wt(e)}function Ot(e){var t,n,s,i,r=e._i,a=e._f;return e._locale=e._locale||ht(e._l),null===r||void 0===a&&""===r?p({nullInput:!0}):("string"==typeof r&&(e._i=r=e._locale.preparse(r)),k(r)?new M(dt(r)):(d(r)?e._d=r:o(a)?function(e){var t,n,s,i,r;if(0===e._f.length)return g(e).invalidFormat=!0,e._d=new Date(NaN);for(i=0;i<e._f.length;i++)r=0,t=w({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],Yt(t),v(t)&&(r+=g(t).charsLeftOver,r+=10*g(t).unusedTokens.length,g(t).score=r,(null==s||r<s)&&(s=r,n=t));_(e,n||t)}(e):a?Yt(e):l(n=(t=e)._i)?t._d=new Date(c.now()):d(n)?t._d=new Date(n.valueOf()):"string"==typeof n?(s=t,null===(i=pt.exec(s._i))?(wt(s),!1===s._isValid&&(delete s._isValid,Dt(s),!1===s._isValid&&(delete s._isValid,c.createFromInputFallback(s)))):s._d=new Date(+i[1])):o(n)?(t._a=f(n.slice(0),function(e){return parseInt(e,10)}),ft(t)):u(n)?function(e){if(!e._d){var t=R(e._i);e._a=f([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ft(e)}}(t):h(n)?t._d=new Date(n):c.createFromInputFallback(t),v(e)||(e._d=null),e))}function Tt(e,t,n,s,i){var r,a={};return!0!==n&&!1!==n||(s=n,n=void 0),(u(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||o(e)&&0===e.length)&&(e=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=i,a._l=n,a._i=e,a._f=t,a._strict=s,(r=new M(dt(Ot(a))))._nextDay&&(r.add(1,"d"),r._nextDay=void 0),r}function bt(e,t,n,s){return Tt(e,t,n,s,!1)}c.createFromInputFallback=n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),c.ISO_8601=function(){},c.RFC_2822=function(){};var xt=n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:p()}),Pt=n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:p()});function Wt(e,t){var n,s;if(1===t.length&&o(t[0])&&(t=t[0]),!t.length)return bt();for(n=t[0],s=1;s<t.length;++s)t[s].isValid()&&!t[s][e](n)||(n=t[s]);return n}var Ct=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Ht(e){var t=R(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||t.isoWeek||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,h=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Ye.call(Ct,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Ct.length;++s)if(e[Ct[s]]){if(n)return!1;parseFloat(e[Ct[s]])!==D(e[Ct[s]])&&(n=!0)}return!0}(t),this._milliseconds=+h+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=ht(),this._bubble()}function Rt(e){return e instanceof Ht}function Ut(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ft(e,n){I(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+L(~~(e/60),2)+n+L(~~e%60,2)})}Ft("Z",":"),Ft("ZZ",""),ue("Z",re),ue("ZZ",re),ce(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Nt(re,e)});var Lt=/([\+\-]|\d\d)/gi;function Nt(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(Lt)||["-",0,0],i=60*s[1]+D(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Gt(e,t){var n,s;return t._isUTC?(n=t.clone(),s=(k(e)||d(e)?e.valueOf():bt(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+s),c.updateOffset(n,!1),n):bt(e).local()}function Vt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Et(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}c.updateOffset=function(){};var It=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,At=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function jt(e,t){var n,s,i,r=e,a=null;return Rt(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:h(e)?(r={},t?r[t]=e:r.milliseconds=e):(a=It.exec(e))?(n="-"===a[1]?-1:1,r={y:0,d:D(a[ye])*n,h:D(a[ge])*n,m:D(a[ve])*n,s:D(a[pe])*n,ms:D(Ut(1e3*a[we]))*n}):(a=At.exec(e))?(n="-"===a[1]?-1:1,r={y:Zt(a[2],n),M:Zt(a[3],n),w:Zt(a[4],n),d:Zt(a[5],n),h:Zt(a[6],n),m:Zt(a[7],n),s:Zt(a[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Gt(t,e),e.isBefore(t)?n=zt(e,t):((n=zt(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(bt(r.from),bt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Ht(r),Rt(e)&&m(e,"_locale")&&(s._locale=e._locale),s}function Zt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function zt(e,t){var n={};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function $t(s,i){return function(e,t){var n;return null===t||isNaN(+t)||(T(i,"moment()."+i+"(period, number) is deprecated. Please use moment()."+i+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),n=e,e=t,t=n),qt(this,jt(e="string"==typeof e?+e:e,t),s),this}}function qt(e,t,n,s){var i=t._milliseconds,r=Ut(t._days),a=Ut(t._months);e.isValid()&&(s=null==s||s,a&&Re(e,be(e,"Month")+a*n),r&&xe(e,"Date",be(e,"Date")+r*n),i&&e._d.setTime(e._d.valueOf()+i*n),s&&c.updateOffset(e,r||a))}jt.fn=Ht.prototype,jt.invalid=function(){return jt(NaN)};var Jt=$t(1,"add"),Bt=$t(-1,"subtract");function Qt(e,t){var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months");return-(n+(t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(n+1,"months")-s)))||0}function Xt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=ht(e))&&(this._locale=t),this)}c.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",c.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Kt=n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function en(){return this._locale}var tn=126227808e5;function nn(e,t){return(e%t+t)%t}function sn(e,t,n){return e<100&&0<=e?new Date(e+400,t,n)-tn:new Date(e,t,n).valueOf()}function rn(e,t,n){return e<100&&0<=e?Date.UTC(e+400,t,n)-tn:Date.UTC(e,t,n)}function an(e,t){I(0,[e,e.length],0,t)}function on(e,t,n,s,i){var r;return null==e?Ie(this,s,i).year:((r=Ae(e,s,i))<t&&(t=r),function(e,t,n,s,i){var r=Ee(e,t,n,s,i),a=Ge(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}I(0,["gg",2],0,function(){return this.weekYear()%100}),I(0,["GG",2],0,function(){return this.isoWeekYear()%100}),an("gggg","weekYear"),an("ggggg","weekYear"),an("GGGG","isoWeekYear"),an("GGGGG","isoWeekYear"),C("weekYear","gg"),C("isoWeekYear","GG"),F("weekYear",1),F("isoWeekYear",1),ue("G",se),ue("g",se),ue("GG",B,z),ue("gg",B,z),ue("GGGG",ee,q),ue("gggg",ee,q),ue("GGGGG",te,J),ue("ggggg",te,J),fe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=D(e)}),fe(["gg","GG"],function(e,t,n,s){t[s]=c.parseTwoDigitYear(e)}),I("Q",0,"Qo","quarter"),C("quarter","Q"),F("quarter",7),ue("Q",Z),ce("Q",function(e,t){t[_e]=3*(D(e)-1)}),I("D",["DD",2],"Do","date"),C("date","D"),F("date",9),ue("D",B),ue("DD",B,z),ue("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ce(["D","DD"],ye),ce("Do",function(e,t){t[ye]=D(e.match(B)[0])});var un=Te("Date",!0);I("DDD",["DDDD",3],"DDDo","dayOfYear"),C("dayOfYear","DDD"),F("dayOfYear",4),ue("DDD",K),ue("DDDD",$),ce(["DDD","DDDD"],function(e,t,n){n._dayOfYear=D(e)}),I("m",["mm",2],0,"minute"),C("minute","m"),F("minute",14),ue("m",B),ue("mm",B,z),ce(["m","mm"],ve);var ln=Te("Minutes",!1);I("s",["ss",2],0,"second"),C("second","s"),F("second",15),ue("s",B),ue("ss",B,z),ce(["s","ss"],pe);var hn,dn=Te("Seconds",!1);for(I("S",0,0,function(){return~~(this.millisecond()/100)}),I(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),I(0,["SSS",3],0,"millisecond"),I(0,["SSSS",4],0,function(){return 10*this.millisecond()}),I(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),I(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),I(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),I(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),I(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),C("millisecond","ms"),F("millisecond",16),ue("S",K,Z),ue("SS",K,z),ue("SSS",K,$),hn="SSSS";hn.length<=9;hn+="S")ue(hn,ne);function cn(e,t){t[we]=D(1e3*("0."+e))}for(hn="S";hn.length<=9;hn+="S")ce(hn,cn);var fn=Te("Milliseconds",!1);I("z",0,0,"zoneAbbr"),I("zz",0,0,"zoneName");var mn=M.prototype;function _n(e){return e}mn.add=Jt,mn.calendar=function(e,t){var n=e||bt(),s=Gt(n,this).startOf("day"),i=c.calendarFormat(this,s)||"sameElse",r=t&&(b(t[i])?t[i].call(this,n):t[i]);return this.format(r||this.localeData().calendar(i,this,bt(n)))},mn.clone=function(){return new M(this)},mn.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Gt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=H(t)){case"year":r=Qt(this,s)/12;break;case"month":r=Qt(this,s);break;case"quarter":r=Qt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:S(r)},mn.endOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var n=this._isUTC?rn:sn;switch(e){case"year":t=n(this.year()+1,0,1)-1;break;case"quarter":t=n(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":t=n(this.year(),this.month()+1,1)-1;break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":t=n(this.year(),this.month(),this.date()+1)-1;break;case"hour":t=this._d.valueOf(),t+=36e5-nn(t+(this._isUTC?0:6e4*this.utcOffset()),36e5)-1;break;case"minute":t=this._d.valueOf(),t+=6e4-nn(t,6e4)-1;break;case"second":t=this._d.valueOf(),t+=1e3-nn(t,1e3)-1;break}return this._d.setTime(t),c.updateOffset(this,!0),this},mn.format=function(e){e||(e=this.isUtc()?c.defaultFormatUtc:c.defaultFormat);var t=A(this,e);return this.localeData().postformat(t)},mn.from=function(e,t){return this.isValid()&&(k(e)&&e.isValid()||bt(e).isValid())?jt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},mn.fromNow=function(e){return this.from(bt(),e)},mn.to=function(e,t){return this.isValid()&&(k(e)&&e.isValid()||bt(e).isValid())?jt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},mn.toNow=function(e){return this.to(bt(),e)},mn.get=function(e){return b(this[e=H(e)])?this[e]():this},mn.invalidAt=function(){return g(this).overflow},mn.isAfter=function(e,t){var n=k(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},mn.isBefore=function(e,t){var n=k(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},mn.isBetween=function(e,t,n,s){var i=k(e)?e:bt(e),r=k(t)?t:bt(t);return!!(this.isValid()&&i.isValid()&&r.isValid())&&("("===(s=s||"()")[0]?this.isAfter(i,n):!this.isBefore(i,n))&&(")"===s[1]?this.isBefore(r,n):!this.isAfter(r,n))},mn.isSame=function(e,t){var n,s=k(e)?e:bt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},mn.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},mn.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},mn.isValid=function(){return v(this)},mn.lang=Kt,mn.locale=Xt,mn.localeData=en,mn.max=Pt,mn.min=xt,mn.parsingFlags=function(){return _({},g(this))},mn.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:U[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=R(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(b(this[e=H(e)]))return this[e](t);return this},mn.startOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var n=this._isUTC?rn:sn;switch(e){case"year":t=n(this.year(),0,1);break;case"quarter":t=n(this.year(),this.month()-this.month()%3,1);break;case"month":t=n(this.year(),this.month(),1);break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":t=n(this.year(),this.month(),this.date());break;case"hour":t=this._d.valueOf(),t-=nn(t+(this._isUTC?0:6e4*this.utcOffset()),36e5);break;case"minute":t=this._d.valueOf(),t-=nn(t,6e4);break;case"second":t=this._d.valueOf(),t-=nn(t,1e3);break}return this._d.setTime(t),c.updateOffset(this,!0),this},mn.subtract=Bt,mn.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},mn.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},mn.toDate=function(){return new Date(this.valueOf())},mn.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||9999<n.year()?A(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):b(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",A(n,"Z")):A(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},mn.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},mn.toJSON=function(){return this.isValid()?this.toISOString():null},mn.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},mn.unix=function(){return Math.floor(this.valueOf()/1e3)},mn.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},mn.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},mn.year=Oe,mn.isLeapYear=function(){return De(this.year())},mn.weekYear=function(e){return on.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},mn.isoWeekYear=function(e){return on.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},mn.quarter=mn.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},mn.month=Ue,mn.daysInMonth=function(){return Pe(this.year(),this.month())},mn.week=mn.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},mn.isoWeek=mn.isoWeeks=function(e){var t=Ie(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},mn.weeksInYear=function(){var e=this.localeData()._week;return Ae(this.year(),e.dow,e.doy)},mn.isoWeeksInYear=function(){return Ae(this.year(),1,4)},mn.date=un,mn.day=mn.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,n,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,n=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=n.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-s,"d")):s},mn.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},mn.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null==e)return this.day()||7;var t,n,s=(t=e,n=this.localeData(),"string"==typeof t?n.weekdaysParse(t)%7||7:isNaN(t)?null:t);return this.day(this.day()%7?s:s-7)},mn.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},mn.hour=mn.hours=nt,mn.minute=mn.minutes=ln,mn.second=mn.seconds=dn,mn.millisecond=mn.milliseconds=fn,mn.utcOffset=function(e,t,n){var s,i=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null==e)return this._isUTC?i:Vt(this);if("string"==typeof e){if(null===(e=Nt(re,e)))return this}else Math.abs(e)<16&&!n&&(e*=60);return!this._isUTC&&t&&(s=Vt(this)),this._offset=e,this._isUTC=!0,null!=s&&this.add(s,"m"),i!==e&&(!t||this._changeInProgress?qt(this,jt(e-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,c.updateOffset(this,!0),this._changeInProgress=null)),this},mn.utc=function(e){return this.utcOffset(0,e)},mn.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Vt(this),"m")),this},mn.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Nt(ie,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},mn.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?bt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},mn.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},mn.isLocal=function(){return!!this.isValid()&&!this._isUTC},mn.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},mn.isUtc=Et,mn.isUTC=Et,mn.zoneAbbr=function(){return this._isUTC?"UTC":""},mn.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},mn.dates=n("dates accessor is deprecated. Use date instead.",un),mn.months=n("months accessor is deprecated. Use month instead",Ue),mn.years=n("years accessor is deprecated. Use year instead",Oe),mn.zone=n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),mn.isDSTShifted=n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!l(this._isDSTShifted))return this._isDSTShifted;var e={};if(w(e,this),(e=Ot(e))._a){var t=e._isUTC?y(e._a):bt(e._a);this._isDSTShifted=this.isValid()&&0<a(e._a,t.toArray())}else this._isDSTShifted=!1;return this._isDSTShifted});var yn=P.prototype;function gn(e,t,n,s){var i=ht(),r=y().set(s,t);return i[n](r,e)}function vn(e,t,n){if(h(e)&&(t=e,e=void 0),e=e||"",null!=t)return gn(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=gn(e,s,n,"month");return i}function pn(e,t,n,s){t=("boolean"==typeof e?h(t)&&(n=t,t=void 0):(t=e,e=!1,h(n=t)&&(n=t,t=void 0)),t||"");var i,r=ht(),a=e?r._week.dow:0;if(null!=n)return gn(t,(n+a)%7,s,"day");var o=[];for(i=0;i<7;i++)o[i]=gn(t,(i+a)%7,s,"day");return o}yn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return b(s)?s.call(t,n):s},yn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},yn.invalidDate=function(){return this._invalidDate},yn.ordinal=function(e){return this._ordinal.replace("%d",e)},yn.preparse=_n,yn.postformat=_n,yn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return b(i)?i(e,t,n,s):i.replace(/%d/i,e)},yn.pastFuture=function(e,t){var n=this._relativeTime[0<e?"future":"past"];return b(n)?n(t):n.replace(/%s/i,t)},yn.set=function(e){var t,n;for(n in e)b(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},yn.months=function(e,t){return e?o(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||We).test(t)?"format":"standalone"][e.month()]:o(this._months)?this._months:this._months.standalone},yn.monthsShort=function(e,t){return e?o(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[We.test(t)?"format":"standalone"][e.month()]:o(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},yn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=y([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=y([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},yn.monthsRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsStrictRegex:this._monthsRegex):(m(this,"_monthsRegex")||(this._monthsRegex=Le),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},yn.monthsShortRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(m(this,"_monthsShortRegex")||(this._monthsShortRegex=Fe),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},yn.week=function(e){return Ie(e,this._week.dow,this._week.doy).week},yn.firstDayOfYear=function(){return this._week.doy},yn.firstDayOfWeek=function(){return this._week.dow},yn.weekdays=function(e,t){var n=o(this._weekdays)?this._weekdays:this._weekdays[e&&!0!==e&&this._weekdays.isFormat.test(t)?"format":"standalone"];return!0===e?je(n,this._week.dow):e?n[e.day()]:n},yn.weekdaysMin=function(e){return!0===e?je(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin},yn.weekdaysShort=function(e){return!0===e?je(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort},yn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=y([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=y([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},yn.weekdaysRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(m(this,"_weekdaysRegex")||(this._weekdaysRegex=qe),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},yn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(m(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Je),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},yn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(m(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Be),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},yn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},yn.meridiem=function(e,t,n){return 11<e?n?"pm":"PM":n?"am":"AM"},ut("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===D(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),c.lang=n("moment.lang is deprecated. Use moment.locale instead.",ut),c.langData=n("moment.langData is deprecated. Use moment.localeData instead.",ht);var wn=Math.abs;function Mn(e,t,n,s){var i=jt(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function kn(e){return e<0?Math.floor(e):Math.ceil(e)}function Sn(e){return 4800*e/146097}function Dn(e){return 146097*e/4800}function Yn(e){return function(){return this.as(e)}}var On=Yn("ms"),Tn=Yn("s"),bn=Yn("m"),xn=Yn("h"),Pn=Yn("d"),Wn=Yn("w"),Cn=Yn("M"),Hn=Yn("Q"),Rn=Yn("y");function Un(e){return function(){return this.isValid()?this._data[e]:NaN}}var Fn=Un("milliseconds"),Ln=Un("seconds"),Nn=Un("minutes"),Gn=Un("hours"),Vn=Un("days"),En=Un("months"),In=Un("years");var An=Math.round,jn={ss:44,s:45,m:45,h:22,d:26,M:11};var Zn=Math.abs;function zn(e){return(0<e)-(e<0)||+e}function $n(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=Zn(this._milliseconds)/1e3,s=Zn(this._days),i=Zn(this._months);t=S((e=S(n/60))/60),n%=60,e%=60;var r=S(i/12),a=i%=12,o=s,u=t,l=e,h=n?n.toFixed(3).replace(/\.?0+$/,""):"",d=this.asSeconds();if(!d)return"P0D";var c=d<0?"-":"",f=zn(this._months)!==zn(d)?"-":"",m=zn(this._days)!==zn(d)?"-":"",_=zn(this._milliseconds)!==zn(d)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||h?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(h?_+h+"S":"")}var qn=Ht.prototype;return qn.isValid=function(){return this._isValid},qn.abs=function(){var e=this._data;return this._milliseconds=wn(this._milliseconds),this._days=wn(this._days),this._months=wn(this._months),e.milliseconds=wn(e.milliseconds),e.seconds=wn(e.seconds),e.minutes=wn(e.minutes),e.hours=wn(e.hours),e.months=wn(e.months),e.years=wn(e.years),this},qn.add=function(e,t){return Mn(this,e,t,1)},qn.subtract=function(e,t){return Mn(this,e,t,-1)},qn.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=H(e))||"quarter"===e||"year"===e)switch(t=this._days+s/864e5,n=this._months+Sn(t),e){case"month":return n;case"quarter":return n/3;case"year":return n/12}else switch(t=this._days+Math.round(Dn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},qn.asMilliseconds=On,qn.asSeconds=Tn,qn.asMinutes=bn,qn.asHours=xn,qn.asDays=Pn,qn.asWeeks=Wn,qn.asMonths=Cn,qn.asQuarters=Hn,qn.asYears=Rn,qn.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12):NaN},qn._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return 0<=r&&0<=a&&0<=o||r<=0&&a<=0&&o<=0||(r+=864e5*kn(Dn(o)+a),o=a=0),u.milliseconds=r%1e3,e=S(r/1e3),u.seconds=e%60,t=S(e/60),u.minutes=t%60,n=S(t/60),u.hours=n%24,o+=i=S(Sn(a+=S(n/24))),a-=kn(Dn(i)),s=S(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},qn.clone=function(){return jt(this)},qn.get=function(e){return e=H(e),this.isValid()?this[e+"s"]():NaN},qn.milliseconds=Fn,qn.seconds=Ln,qn.minutes=Nn,qn.hours=Gn,qn.days=Vn,qn.weeks=function(){return S(this.days()/7)},qn.months=En,qn.years=In,qn.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t,n,s,i,r,a,o,u,l,h,d,c=this.localeData(),f=(n=!e,s=c,i=jt(t=this).abs(),r=An(i.as("s")),a=An(i.as("m")),o=An(i.as("h")),u=An(i.as("d")),l=An(i.as("M")),h=An(i.as("y")),(d=r<=jn.ss&&["s",r]||r<jn.s&&["ss",r]||a<=1&&["m"]||a<jn.m&&["mm",a]||o<=1&&["h"]||o<jn.h&&["hh",o]||u<=1&&["d"]||u<jn.d&&["dd",u]||l<=1&&["M"]||l<jn.M&&["MM",l]||h<=1&&["y"]||["yy",h])[2]=n,d[3]=0<+t,d[4]=s,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,d));return e&&(f=c.pastFuture(+this,f)),c.postformat(f)},qn.toISOString=$n,qn.toString=$n,qn.toJSON=$n,qn.locale=Xt,qn.localeData=en,qn.toIsoString=n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",$n),qn.lang=Kt,I("X",0,0,"unix"),I("x",0,0,"valueOf"),ue("x",se),ue("X",/[+-]?\d+(\.\d{1,3})?/),ce("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ce("x",function(e,t,n){n._d=new Date(D(e))}),c.version="2.24.0",e=bt,c.fn=mn,c.min=function(){return Wt("isBefore",[].slice.call(arguments,0))},c.max=function(){return Wt("isAfter",[].slice.call(arguments,0))},c.now=function(){return Date.now?Date.now():+new Date},c.utc=y,c.unix=function(e){return bt(1e3*e)},c.months=function(e,t){return vn(e,t,"months")},c.isDate=d,c.locale=ut,c.invalid=p,c.duration=jt,c.isMoment=k,c.weekdays=function(e,t,n){return pn(e,t,n,"weekdays")},c.parseZone=function(){return bt.apply(null,arguments).parseZone()},c.localeData=ht,c.isDuration=Rt,c.monthsShort=function(e,t){return vn(e,t,"monthsShort")},c.weekdaysMin=function(e,t,n){return pn(e,t,n,"weekdaysMin")},c.defineLocale=lt,c.updateLocale=function(e,t){if(null!=t){var n,s,i=st;null!=(s=ot(e))&&(i=s._config),(n=new P(t=x(i,t))).parentLocale=it[e],it[e]=n,ut(e)}else null!=it[e]&&(null!=it[e].parentLocale?it[e]=it[e].parentLocale:null!=it[e]&&delete it[e]);return it[e]},c.locales=function(){return s(it)},c.weekdaysShort=function(e,t,n){return pn(e,t,n,"weekdaysShort")},c.normalizeUnits=H,c.relativeTimeRounding=function(e){return void 0===e?An:"function"==typeof e&&(An=e,!0)},c.relativeTimeThreshold=function(e,t){return void 0!==jn[e]&&(void 0===t?jn[e]:(jn[e]=t,"s"===e&&(jn.ss=t-1),!0))},c.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},c.prototype=mn,c.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},c});
/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.PerfectScrollbar = factory());
}(this, (function () { 'use strict';

function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
    var this$1 = this;

  for (var name in this$1.handlers) {
    this$1.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

var processScrollDiff = function(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
};

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

var updateGeometry = function(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(i.railXWidth * i.containerWidth / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      (i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(i.railYHeight * i.containerHeight / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      roundedScrollTop *
        (i.railYHeight - i.scrollbarYHeight) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
};

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

var clickRail = function(i) {
  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
};

var dragThumb = function(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
};

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    startingScrollTop = element[scrollTop];
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
    e.preventDefault();
  });
}

var keyboard = function(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
};

var wheel = function(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
};

var touch = function(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
};

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this$1.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

return PerfectScrollbar;

})));

/*!
 * Chart.js v2.8.0
 * https://www.chartjs.org
 * (c) 2019 Chart.js Contributors
 * Released under the MIT License
 */

!function(t){"use strict";function e(t){if(t instanceof Date)return t;throw new Error("Couldn't cast `"+t+"` to a date object.")}function s(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function o(t){var e={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"};return function(o){var n=o.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(n)for(var a=0,l=n.length;a<l;++a){var h=n[a].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),r=s(h[0]),c=h[1]||"",f=h[3]||"",u=null;h=h[2],e.hasOwnProperty(h)&&(u=e[h],u=Number(t[u])),null!==u&&("!"===c&&(u=i(f,u)),""===c&&u<10&&(u="0"+u.toString()),o=o.replace(r,u.toString()))}return o=o.replace(/%%/,"%")}}function i(t,e){var s="s",o="";return t&&(1===(t=t.replace(/(:|;|\s)/gi,"").split(/\,/)).length?s=t[0]:(o=t[0],s=t[1])),Math.abs(e)>1?s:o}var n=[],a={precision:100,elapse:!1,defer:!1},l=function(e,s,o){this.el=e,this.$el=t(e),this.interval=null,this.offset={},this.options=t.extend({},a),this.instanceNumber=n.length,n.push(this),this.$el.data("countdown-instance",this.instanceNumber),o&&("function"==typeof o?(this.$el.on("update.countdown",o),this.$el.on("stoped.countdown",o),this.$el.on("finish.countdown",o)):this.options=t.extend({},a,o)),this.setFinalDate(s),!1===this.options.defer&&this.start()};l.prototype.start=function(){null!==this.interval&&clearInterval(this.interval);var t=this;this.update(),this.interval=setInterval(function(){t.update.call(t)},this.options.precision)},l.prototype.stop=function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},l.prototype.toggle=function(){this.interval?this.stop():this.start()},l.prototype.pause=function(){this.stop()},l.prototype.resume=function(){this.start()},l.prototype.remove=function(){this.stop.call(this),n[this.instanceNumber]=null,delete this.$el.data().countdownInstance},l.prototype.setFinalDate=function(t){this.finalDate=e(t)},l.prototype.update=function(){if(0!==this.$el.closest("html").length){var e,s=void 0!==t._data(this.el,"events"),o=new Date;e=this.finalDate.getTime()-o.getTime(),e=Math.ceil(e/1e3),e=!this.options.elapse&&e<0?0:Math.abs(e),this.totalSecsLeft!==e&&s&&(this.totalSecsLeft=e,this.elapsed=o>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-o.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))}else this.remove()},l.prototype.dispatchEvent=function(e){var s=t.Event(e+".countdown");s.finalDate=this.finalDate,s.elapsed=this.elapsed,s.offset=t.extend({},this.offset),s.strftime=o(this.offset),this.$el.trigger(s)},t.fn.countdown=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){var s=t(this).data("countdown-instance");if(void 0!==s){var o=n[s],i=e[0];l.prototype.hasOwnProperty(i)?o[i].apply(o,e.slice(1)):null===String(i).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(o.setFinalDate.call(o,i),o.start()):t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,i))}else new l(this,e[0],e[1])})}}(window.jQuery);
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});