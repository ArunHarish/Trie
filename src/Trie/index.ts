import TrieInterface, { TraversalStack } from "./Trie.interface";
import Node from "./Node";
class Trie implements TrieInterface<string> {
    private root : Node;

    constructor() {
        this.root = new Node();
    };

    append(value: string): void {
        if (!value.length) {
            return ;
        };     

        let currentNode : Node = this.root;
        for (let letter of value) {
            if (currentNode.hasChild(letter)) {
                currentNode = currentNode.getChild(letter);
            } else {    
                currentNode.append(letter);
                currentNode = currentNode.getChild(letter);
            };
        };
    };
    
    traverse(): Array<string> {
        let result : Array<string> = [];
        let stack : Array<TraversalStack> = [{
            node : this.root,
            content : ""
        }];

        // Pre-order traversal
        while (stack.length) {
            let currentStack = stack.pop();
            let currentNode = currentStack.node;
            let previousValue : string = currentStack.content;

            let children = currentNode.getChildren();

            if (!children.length && previousValue) {
                result.push(previousValue);
            };

            children.forEach((node : Node) => {
                let currentValue : string = node.getValue();
                stack.push({
                    node : node,
                    content : previousValue + currentValue
                });
            });

        };

        return result;
    };

};


export default Trie;