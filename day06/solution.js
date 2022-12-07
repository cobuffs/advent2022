const input = "hrbbjllllspssblslvvrdrbbpbbmcccfppvbbwvbbmrmjrjrfrgfgbffgfqfqlltlwttscsncscchssrppffvwwvvpnnwwwpvwvhhnvhhbttvzzdlzdlzzwmmjhhznnjdnnnqddbtdbdbsdsmdsdrrdpdwpdppgcgqgcctftsfszslljbljbjwbwbnwnqqrnnztntmtrmmzwzdwzwgwwwjhjsjgjtjjhpjhhppqzqdqffrvrtvvsmmgwmgwgbbclltctptzpzhpzptzppcfpcfftflfzftztddzgzmmfsmsrmmsstttvbvmbvvsmsqmqlldjdtthwtwbwggrzzjrzrcctffsshqshhpthhlnhlhqhdqqrwrmmcttpfttzfzgzdgdzzwrrtsrrsnrnccrbbsssbpbjjvzzwlwtwjwsjwjggzqgzzrsszzjnzjzwjzzcrzczncnqqztzfzhfhvvtjvjdvjjmrjrppvzppczpczcggshghvhnhhsrsnsdszzdpzpzlpzzhwwmnwmwmcwwfnwfwjjcbcncllcsllqdqzzhqhmqmbbjvjjwwcjjpnpllzfzddtmtccqrcrtrwrpphpmpplslmltthnnvhhvrvbblhhrrdqqmbqqgtqggdgcdcvvsbsswvvpggbbtftlflglzlmlbbfhhrshswhshffhhdnnrfrvrmrnrprrmfmpmnpnfnggvvcncdcrczrzccpmmssrbbdjdtdrdwrrwhrrvrtvvszvvwvzzmhhjhhwlhlqlvlttzftztdtstftrfrdddmtmzzsqzqvvpdpdcpcncnrrtntznzrzgznztnznhhsqqnrqrhhlzhzthhfddrzdrrqmqggcmmllnjjvwwjccfjfqfcfzccwvcwvcvjcjtjtnnqsqmqrmrzrszrszzfwfggnmmcdmdjmmhwwgfwfnwnlwwcffsrffvnvbvnvwnwgnwnmmbzbmbpplmplpspzpmzpzdzgzrzrtrjrbbppwvwgwmggqwgghqqshhcwcqwcqcfcbbnsnrrtztzrtrvtvhthzhmmrqqrwqqsjqjcctgtwthhqmmnffmgmdgdlgljjhwjwggrqqfrqqjvqvhqqgsqsgsttmrrbprbppmjppslpsllvlfvlvrvhvtqmrjcdzwsbzfmgmwmwqwhztqrsdzhqjqvbjbntnbndflthljcczdmmhszfgsplrtlqnfzbrlqngwdqtfwcmrdjrsmdpmjmqwrbwfjzwnvqhfmlqtvvnlfzbfccwslqpbzzjccbvrzhghqwtvqgwrmsfzqnmnqqjsjtpcmngpqgllfsnpqtjjbqcdppnsmtwrslnrbqtwvnbctzvwfmgctscmzjbqqgqdwbpzmrdwgfcjzftzgmfcjhchbnmnqnrgtqngwrmncjvptqqdtjtgtpzzdrfsdgmwlwrjnqldbwrqjrhwcczlzvlhpgrnwzhbwjnpthggczfgtrjnzvnlfdfbwcnzfbwlwlmgnnjnpvhbhqgnzhqsnmvbcftsmrcgpvnnnmgnrvpbzlpwnbwpzmwpgqvbfgjwfrjqnvvgmqwwcfddqmdznmfhpjcfgptqdqwmplrglbwlmsqzjshrlhflcjvptgrcfhjfgqmlfzrtphpbvcqzwpcnwljjdlmqzhcctqshdngrgtlfsrfccdtlvmqcdgnpcvphdsrpzfzwclvsqcpzqlfvvqzggdhpfzdvhshglvfzfmcllrdfjfsjtngjgddcpqnlmrnplwtlvwdvzftltnsnspcdztgqhlhvvbnwvnmhscfnqbngpvprzfrjcmfpfzfftrlnwgllhnjndpjdrwcgqpcgcqngnbfzlvzvhnqdjthflmwvppmbdssddmgsbgrqnpjzrjpzdddqgsdlmwnhhpjbthclvqhgrsnrbqgtnsjhncnzbhrdgftvbptrqssvsqfpqnddhmgwcrfqndqjsqgffmhdvqhjrdlmrlcqctqccprwlbqgqrwmtfhwmfjfqzdqbsdsjbtsvfvgbsrvqwnqqqqthpsqgcfslsqtnjwtsrcdcctggdghrjwpbfccrtwgszwbrsjswmjmjbcqrsgbcfsdjzsbjnnssnddnnvwgftlrqvphnqcgjszscrlhhjnljlqcjqtqfwbmdmrgdlcqqwmbsmsdhpplvlfglqwspbfptlbzqjwhqmfvzvsvpjclcdzsbvntmhdqdvhghcmmflpjbglsghbswdshtsbdrgpsrsclrmfwwqbrgdjsqztgttqpwhnfhszlgbfpzhczsnwqflmshlgbrpmdzgpqwtsbssgfjbtrwbmztlwwfmsdgpgfgdjfdccwlfgztbcbqjvjtvslmddjplrswwcszspgplsrhrnwnmrrfbcgdmntcrlvnfqtwwcczsglrhtrfqnmhvgzjpmlplqvqhmnfgvzqcmzhqszgslvndqtqhvrbvbmclbcbjdswvcjrzgfdmdwnnlzlzqcffsrqdfmmpzfnmdsnqlpcrhzsdnsflblcjsfsgcnsspftjrlmdjsmfpqtmlgfvnlfnjscsgwzwvpjrvvclhsbqldlnmtglhbjfwlzmvrbvgtprfjbjhhnlqnbrswwlqtcgrjrltdrnfrjhrntllptlsbhqrwvdsfrlghtfcndznzjwcgmtdvffltgrdmljlqhdtmdvnfsfsrvdpmhlrrsttvqlwfptddwbpfrbclwwzmfpttmrmmqzjnbbnnfvzwmmcfshvrlbdbjzprftbqvdsghnnzwbjccpthdsvsdlgvphsgjdqjwsgmzqnqpqvgqjvwgjtzpmqqwnlwrwhqqjjclcbhjgpwhqdclwmqfmwbwmwwvcbhfznfhcfbprfcdqlbcttnvgnjwswcmpbrghtzgdbppbprffzjgvddzpwmdctrhnrfzdfhtmnfrsfdqvzcnrtncflhvldcndwqtvbggmwlzhchlcwtcbqcvlfhdwljgddwpvcfczvfqmphgtdsnsqwdpvvmwnwqjbrjwbdhhgtffphsdrvspsbgmfrmwmhnrgqdfppzgfpgmqjcsnglczgwhjthfhztzrlpgzjhcfrjpjvtjptptbvflftjtcfhmbwlhlbhvnjnbfmwjrgbvvhmdlncdgncgfjcnnpdljfcjsmsfscqpwsgcmlhhqmldsnjfrrqpghwncmgwgnjsdtvbhrbbnmpqjrrctqqnqzztmbqmdsgdvmmlwmbvprllzgntnmttrlzrttmjjlrwpwmtfznmwnsjmjhjdnsppfhcrjpzhjqzdtdbsjshfzzvrwvjbjbgtsfpgggbdztczwlhpmthfjdgsbrvlwmlrvgdrpjzccwmgpcnqqzmqdjqmwsrzwsmtmdjdhmjrwfwnzlmfnqtcgtslwtlnwhvmqntmglhntnsjlnmzfvfdztcfwmpchsrsdmqvqcwljzrmmssjvbmvvnmqlbsdwnrbmqctdtmfzlgfzpmjcnftgftvjpfbwwmzfdrrwjwcfwfcfmzbbnppgjrmbcvmvnjpdrzmvndvddtvshlnjjwgtsvnwtwnhcbfpnthpjlrhgrqccdgppjvdqjwqrfrrgnvhfwvjhnwhntnpmghphrtgqhwtbrqhqljfdjbgnlgmqqgfcqpqfhcpgspdbvlbfjvlrgmtjztwdzlrhqwwtcpdvsqgssjbjjgqlwbcctzzqvvmdzpfrmspmqhtzwgcfsslpnhpjfwqrrfbwbndrvhnnsjnlvlvqdsgwzjsrprhgtvsfbhbcpljdczbtdwzcnhzntrwcrjctmhtjfdlthznzmqblppzcqgpjhlzjrmcvpptfjjzltdhmvwphwlccscwrwfcqpqwwrzcmnltzdcfvtjrcvsqwtchrmdfzjmzjfhppjzbhglwqggzqqnspfmzrfwrqdqdrsdbsdhcgdqrrnjlwrqhfhpzjhrvjndqphndnnnbwhrjvqrrbvlhhbljjcwmfpvnhcszfshlsnczgtcfhjslbhzczdqdmdnvqdzhbmbpcnbntwgllfscrcwhfrgtfvftmwhbgfhjzjrbvvwc"
//const input = "bvwbjplbgvbhsrlpgdmjqwftvncz"

const datasteam = input.split('');

let four = [];

//look for 4 unique letters
// for(var i = 0; i < datasteam.length - 4; i++) {
//     //take 4 characters
//     let elem = datasteam[i];
//     let arr =[datasteam[i+1], datasteam[i+2], datasteam[i+3]]
//     if (arr.indexOf(elem) != -1) {
//         continue;
//     } else {
//         elem = arr.shift();
//         if (arr.indexOf(elem) != -1) {
//             continue;
//         } else if (arr[0] == arr[1]) {
//             continue
//         } else {
//             console.log(i+4);
//             break;
//         }
//     }
// }

part2();

function part2() {
    //look for 14 distinct characters
    //build batches of 14
    for(var i = 0; i < datasteam.length - 14; i++) {
        let batch = datasteam.slice(i, i + 14);
        const checker = new Set(batch);
        if(checker.size == 14) {
            console.log(i+14);
            break;
        }
    }
}