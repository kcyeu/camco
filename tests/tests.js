test( "Parse Monster Code Test", function() {
  deepEqual( parseMC('zg3dzii49:1'), {'id': '100000049443641', 'mpool': '1'}, "Slot 1 test" );
  deepEqual( parseMC('zg3dzii49:2'), {'id': '100000049443641', 'mpool': '2'}, "Slot 2 test" );
  deepEqual( parseMC('zg3dzii49:3'), {'id': '100000049443641', 'mpool': '3'}, "Slot 3 test" );
  deepEqual( parseMC('zg3dzii49:101'), {'id': '100000049443641', 'mpool': '101'}, "Slot 101 test" );

  deepEqual( parseMC(' zg3dzii49:1'), {'id': '100000049443641', 'mpool': '1'}, "Left trim test" );
  deepEqual( parseMC('zg3dzii49:1 '), {'id': '100000049443641', 'mpool': '1'}, "Right trim test" );
  deepEqual( parseMC(' zg3dzii49:1 '), {'id': '100000049443641', 'mpool': '1'}, "Trim test" );

  ok( parseMC('zg3dzii491') === false, "Non-delimiter test" );
  ok( parseMC('zg3dzii49:') === false, "Non-mpool test" );
  ok( parseMC(':1') === false, "Non-id test" );
});
