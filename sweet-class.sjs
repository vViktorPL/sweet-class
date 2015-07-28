macro class {
  case {_ $className {
        $(constructor $cParams $cBody)
        $($($modifier:ident $functionName:ident $params $body) ...)
    }} => {
    var privateFunctions = [];
    var publicFunctions = [];

    var modifiers = #{$modifier...};
    var functionNames = #{$functionName...};
    var params = #{$params...};
    var body = #{$body...};
    for (var i = 0; i < modifiers.length; ++i) {
        switch (modifiers[i].token.value) {
            case 'private':
                privateFunctions.push.apply(privateFunctions,
                    #{function}
                    .concat(
                        functionNames[i],
                        params[i],
                        body[i]
                    )
                );
            break;
            case 'public':
                publicFunctions.push.apply(publicFunctions,
                    #{$className.prototype.}
                    .concat(
                        functionNames[i],
                        #{= function},
                        params[i],
                        body[i]
                    )
                );
            break;
        }
    }

    letstx $privateFunctions = privateFunctions;
    letstx $publicFunctions = publicFunctions;
    letstx $constructor = #{function $className $cParams $cBody}

    return #{
        window.$className = (function(){
            $constructor
            $privateFunctions
            $publicFunctions

            return $className;

        })();
    }
  }
}

export class;
