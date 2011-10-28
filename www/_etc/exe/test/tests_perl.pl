#!/usr/bin/perl -T

require '../basics.pl';

print ("Content-Type: text/html; charset=UTF-8\n\n");

$string = "Well, had I noticed, the minute I began trying to imagine this Schulmeisterlein Wutz, that I had ended up simply imitating the character I probably would have stopped right there. A line, a joke, any creation, is nothing without some sort of occlusion; comic timing, if you will. Had I seen this coming, I might have been spared months and years of trouble. Instead, by the time it occurred to me that while I was desperately trying to write a translation of Wutz, I was unwittingly writing an imitation of the protagonist, this minor insight had all the whiff of felicity. Like a conspiracy theorist blinded by confirmation bias, this was, to me, one of those minor coincidences that seems to confirm that the idea existed a priori. It was as if my mind deliberately occluded all this from me in order to give the idea for this book some time to grow. (The warmth of ignorance is the incubator of our most elaborate ideas.) I was still so far from aware of any kinship I might have with Wutz that I had by now gone back to the most fundamental examples of decryption I could think of. Michael Ventris decrypted Linear B, the pictographic script of the Mycenaeans, by a process of pattern matching. Beginning with some known proper nouns, the names of kings and towns, he deduced a phonological value for all the pictograms. John Chadwick, his collaborator and, later, biographer, believes that Ventris’s architectural training gave him the ability to grasp patterns where others saw mere chaos. I wondered if I could apply such a system to Wutz. There were certainly enough proper-looking nouns in the German text. Unfortunately, there was the slight problem that all nouns in the German are capitalised so that I had no way of knowing whether, say, ‘Notdurft’ would be a town, a character, an object or a sentiment. A small industrialising town with an ancient centre, the ambitious father of a marriageable acquaintance, a small knife for cutting quills or the desire to have a conversation with an imaginary intellectual equal. These serried German sentences look like Neo-Classical avenues with their capitalled columns propping up the text above. Even Mark Twain, who thought this capitalisation one of the very few good ideas in the structure of the German language, found it confusing. Linear B, it turned out was perhaps too radical an analogy. Besides, Ventris was trying to understand a known language in an unknown script. I knew the alphabet here but I did not know the language. The process of reconstructing the source language is cryptanalysis not translation. Still, it was when my interest drifted into cryptanalysis that I came across another of those encouraging coincidences—a tragic encouragement as it turned out. Initially I thought I could see some similarity between Ventris’s process and Wutz’s. Wasn’t Wutz also turning an inchoate series of pictures in his imagination into the verbal language of his books? Did he not dwell on a few words like ‘polyglottal infusion’ and try to imagine what such a document would look like? I imagined Wutz conjuring with the few words he had. A polyglottal infusion sounded as though it were something that worked by suggestion and total immersion, a bouquet garni of grammar and vocabulary that the student would acquire without really noticing. Low German without tears. The description of this book also mentioned that it was a mere forty-five pages long, and not bound in rigid covers. A few hundred words in a semi-permeable structure, uncontained, that would osmotically transfer the language they contained into the mind of the inquisitive Walloon. Which few hundred words would be required? Wutz asked himself. Those most indicative of the use of the language, archetypes of syntax and declension? Was it a completely artificial exercise which, after the instruction, would be removed and discarded? Or, probably far more useful, those words most commonly used in daily speech—but surely that would depend on the young Justine’s station in life. It would be of no use to her, for instance, to obtain a large lexicon of agricultural words if she were a townswoman...";

print cleanText($string);

print "<hr>";

print length($string);


    use Test::Varnish;

    plan tests => 2;

    my $test_client = Test::Varnish->new({
        verbose => 1
    });

    $test_client->isnt_cached(
        {
            url => 'http://my.opera.com/community/',
        },
        'My Opera frontpage is not (yet) cached by Varnish'
    );

    $test_client->is_cached(
        {
            url => 'http://www.cnn.com/',
        },
        'Is CNN.com using Varnish?'
    );

