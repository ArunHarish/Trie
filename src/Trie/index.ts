import TrieInterface, { TraversalStack } from "./Trie.interface";
import Node from "./Node";
class Trie implements TrieInterface<string> {
    private root : Node;

    constructor() {
        this.root = new Node();
    };

    /**
     * Method to insert the text to Trie index.
     * @param value The string content to inserted into Trie.
     */
    public append(value: string): void {
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

    /**
     * A helper function to traverse through the Trie starting from the given
     * position in the stack.
     * @param stack holds next children to traverse into along with their   
     *              string value.
     * @returns all the children elements traversed into.
     */
    private find(stack : Array<TraversalStack>) : Array<string> {
        let result : Array<string> = [];
        // Pre-order traversal
        while (stack.length) {
            let currentStack : TraversalStack = stack.pop();
            let currentNode : Node = currentStack.node;
            let previousValue : string = currentStack.content;

            let children : Array<Node> = currentNode.getChildren();

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
    
    /**
     * Traverses the entire Trie returning all the words.
     * @returns All the words indexed.
     */
    public traverse(): Array<string> {
        let stack : Array<TraversalStack> = [{
            node : this.root,
            content : ""
        }];

        return this.find(stack);
    };

    /**
     * Searches through the Trie and gives all the matching string
     * starting with the given prefix. 
     * @param query The prefix to start the search from.
     * @returns an empty array if there are no string starting from
     *          the prefix or query is an empty string.
     */
    public search(query : string) : Array<string> {
        let stack : Array<TraversalStack> = [];
        let prefixNode : Node = this.root;

        for (let currentCharacter of query) {
            if (!prefixNode.hasChild(currentCharacter)) {
                prefixNode = null;
                break ;
            };
            prefixNode = prefixNode.getChild(currentCharacter);
        };

        if (prefixNode === null || prefixNode === this.root) {
            return [];
        };

        // Append the stack so to start from prefix matched so far
        stack.push({
            node : prefixNode,
            content : query
        });

        return this.find(stack);
    };
};

export default Trie;