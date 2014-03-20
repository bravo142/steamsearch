var $j = jQuery.noConflict();


$j(document).ready(function(){
  var app = $j('#findItemsSearchBox').val();
  var activated = false;
  if(app.indexOf('appid:730') >= 0) {
    modifyCSGOSearchBox();
    activated = true;
  } else if(app.indexOf('appid:570') >= 0) {
    modifyDotASearchBox();
    activated = true;
  } else if(app.indexOf('appid:753') >= 0) {
    modifySteamSearchBox();
    activated = true;
  }

  if(!activated) return;

  var help_html = '<div class="help" style="font-size: 70%; margin-top: 15px;"><hr /><a target="_blank" href="http://www.reddit.com/r/steamsearch">Reddit Forums</a> | <a target="_blank" href="http://steamsearch.bassambarham.com/donate">Donate</a></div>';

  $j('#market_search').append(help_html);

  $j('.custom-search-item select, .custom-search-item input.custom-search').css({width: '100%'});

  $j('#reset-custom-form').click(function(e){
    e.preventDefault();
    $j('#holder-for-gem').hide();
    $j('#select-hero_item').empty().parent().hide();
    $j('.custom-search-item select').val('');
    $j('.custom-search-item input.custom-search').val('');
    $j('#market_search_stattrak_checkbox').removeAttr('checked');
  });
});

function modifyCSGOSearchBox ()
{

  var search_html = '';

  var weapons_nested = {};

  var pistols = [
    'Glock-18','P250', 'CZ75-Auto',
    'Desert Eagle','Dual Berettas', 
    'Tec-9','P2000', 
    'USP-S','Five-SeveN', 
  ];

  var heavy = [
    'Nova','XM1014', 
    'Sawed-Off','MAG-7', 
    'M249', 'Negev'
  ];

  var smgs = [
    'MAC-10','MP7', 
    'UMP-45','PP-Bizon', 
    'P90','MP9' 
  ];

  var rifles = [
    'Galil AR','AK-47', 
    'SSG 08','SG 553', 
    'AWP','G3SG1', 
    'FAMAS','M4A4', 
    'M4A1-S','AUG', 
    'SCAR-20'
  ];

  var knives = [
    'Gut Knife','Flip Knife', 
    'Bayonet', 'M9 Bayonet',
    'Karambit'
  ];

  var cases = [
    'Weapon Case', 'Case Key', 'Sticker', 'Sticker Capsule', 'Operation Pass'
  ];

   weapons_nested['Pistols'] = pistols;
   weapons_nested['Heavy'] = heavy;
   weapons_nested['SMGs'] = smgs;
   weapons_nested['Rifles'] = rifles;
   weapons_nested['Knives'] = knives;
   weapons_nested['Cases/Keys/Stickers'] = cases;


  search_html += customNestedSearchDropdown('weapon','','Item',weapons_nested);

  var grades = [
    'Consumer grade','Industrial grade', 
    'Mil-spec', 'Restricted', 
    'Classified', 'Covert'
    //,'Covert Knife'
    ];
  search_html += customSearchDropdown('grade','','Weapon Quality',grades);

  var paints = [
    'Battle-Scarred','Well-Worn', 
    'Field-Tested', 'Minimal Wear', 
    'Factory New'
    ];
  search_html += customSearchDropdown('paint','','Paint Quality',paints);


  var collections = [
    'The Assault Collection','The Aztec Collection', 
    'The Dust Collection', 'The Inferno Collection', 
    'The Militia Collection', 'The Office Collection', 
    'The Nuke Collection', 'The Vertigo Collection', 
    'The Dust 2 Collection', 'The Italy Collection', 
    'The Lake Collection', 'The Mirage Collection', 
    'The Safehouse Collection', 'The Train Collection', 
    'The Arms Deal Collection', 'The Arms Deal 2 Collection', 
    'The Arms Deal 3 Collection',
    'The eSports 2013 Collection', 'The Alpha Collection', 
    'The Bravo Collection', 'The Winter Offensive Collection', 
    'The eSports Winter Collection', 'The Phoenix Collection'

    ];

  var stattrack_checked = '';
  var searchString = $j('#findItemsSearchBox').val();
  if (searchString.toLowerCase().indexOf('stattrak') >= 0)
    stattrack_checked = 'checked="checked"';

  search_html += customSearchDropdown('collection','','Collection',collections);

  search_html += '<div id="market_search_stattrak" style="margin-top: 5px;">'
              +'<input class="market_search_checkbox" '+stattrack_checked+' id="market_search_stattrak_checkbox" type="checkbox" name="stattrak" value="stattrak" title=""><label for="market_search_stattrak_checkbox">StatTrak Only</label></div>';

  search_html += '<div style="margin-top: 10px;"><input type="submit" name="submit" value="Custom Search" id="custom-search-submit" /> <a href="#" id="reset-custom-form">Reset</a></div>';  
  
  $j('#market_search').append(search_html);

  $j('#custom-search-submit').click(function(e){
    e.preventDefault();
    performCustomSearch(730);
  })

}



function modifyDotASearchBox ()
{

  var search_html = '';

  var heroes_json = '{"result":{"heroes":[{"name":"npc_dota_hero_abaddon","id":102,"localized_name":"Abaddon"},{"name":"npc_dota_hero_abyssal_underlord","id":108,"localized_name":"Abyssal Underlord"},{"name":"npc_dota_hero_alchemist","id":73,"localized_name":"Alchemist"},{"name":"npc_dota_hero_ancient_apparition","id":68,"localized_name":"Ancient Apparition"},{"name":"npc_dota_hero_antimage","id":1,"localized_name":"Anti-Mage"},{"name":"npc_dota_hero_axe","id":2,"localized_name":"Axe"},{"name":"npc_dota_hero_bane","id":3,"localized_name":"Bane"},{"name":"npc_dota_hero_batrider","id":65,"localized_name":"Batrider"},{"name":"npc_dota_hero_beastmaster","id":38,"localized_name":"Beastmaster"},{"name":"npc_dota_hero_bloodseeker","id":4,"localized_name":"Bloodseeker"},{"name":"npc_dota_hero_bounty_hunter","id":62,"localized_name":"Bounty Hunter"},{"name":"npc_dota_hero_brewmaster","id":78,"localized_name":"Brewmaster"},{"name":"npc_dota_hero_bristleback","id":99,"localized_name":"Bristleback"},{"name":"npc_dota_hero_broodmother","id":61,"localized_name":"Broodmother"},{"name":"npc_dota_hero_centaur","id":96,"localized_name":"Centaur Warrunner"},{"name":"npc_dota_hero_chaos_knight","id":81,"localized_name":"Chaos Knight"},{"name":"npc_dota_hero_chen","id":66,"localized_name":"Chen"},{"name":"npc_dota_hero_clinkz","id":56,"localized_name":"Clinkz"},{"name":"npc_dota_hero_crystal_maiden","id":5,"localized_name":"Crystal Maiden"},{"name":"npc_dota_hero_dark_seer","id":55,"localized_name":"Dark Seer"},{"name":"npc_dota_hero_dazzle","id":50,"localized_name":"Dazzle"},{"name":"npc_dota_hero_death_prophet","id":43,"localized_name":"Death Prophet"},{"name":"npc_dota_hero_disruptor","id":87,"localized_name":"Disruptor"},{"name":"npc_dota_hero_doom_bringer","id":69,"localized_name":"Doom"},{"name":"npc_dota_hero_dragon_knight","id":49,"localized_name":"Dragon Knight"},{"name":"npc_dota_hero_drow_ranger","id":6,"localized_name":"Drow Ranger"},{"name":"npc_dota_hero_earth_spirit","id":107,"localized_name":"Earth Spirit"},{"name":"npc_dota_hero_earthshaker","id":7,"localized_name":"Earthshaker"},{"name":"npc_dota_hero_elder_titan","id":103,"localized_name":"Elder Titan"},{"name":"npc_dota_hero_ember_spirit","id":106,"localized_name":"Ember Spirit"},{"name":"npc_dota_hero_enchantress","id":58,"localized_name":"Enchantress"},{"name":"npc_dota_hero_enigma","id":33,"localized_name":"Enigma"},{"name":"npc_dota_hero_faceless_void","id":41,"localized_name":"Faceless Void"},{"name":"npc_dota_hero_furion","id":53,"localized_name":"Nature\'s Prophet"},{"name":"npc_dota_hero_gyrocopter","id":72,"localized_name":"Gyrocopter"},{"name":"npc_dota_hero_huskar","id":59,"localized_name":"Huskar"},{"name":"npc_dota_hero_invoker","id":74,"localized_name":"Invoker"},{"name":"npc_dota_hero_jakiro","id":64,"localized_name":"Jakiro"},{"name":"npc_dota_hero_juggernaut","id":8,"localized_name":"Juggernaut"},{"name":"npc_dota_hero_keeper_of_the_light","id":90,"localized_name":"Keeper of the Light"},{"name":"npc_dota_hero_kunkka","id":23,"localized_name":"Kunkka"},{"name":"npc_dota_hero_legion_commander","id":104,"localized_name":"Legion Commander"},{"name":"npc_dota_hero_leshrac","id":52,"localized_name":"Leshrac"},{"name":"npc_dota_hero_lich","id":31,"localized_name":"Lich"},{"name":"npc_dota_hero_life_stealer","id":54,"localized_name":"Lifestealer"},{"name":"npc_dota_hero_lina","id":25,"localized_name":"Lina"},{"name":"npc_dota_hero_lion","id":26,"localized_name":"Lion"},{"name":"npc_dota_hero_lone_druid","id":80,"localized_name":"Lone Druid"},{"name":"npc_dota_hero_luna","id":48,"localized_name":"Luna"},{"name":"npc_dota_hero_lycan","id":77,"localized_name":"Lycan"},{"name":"npc_dota_hero_magnataur","id":97,"localized_name":"Magnus"},{"name":"npc_dota_hero_medusa","id":94,"localized_name":"Medusa"},{"name":"npc_dota_hero_meepo","id":82,"localized_name":"Meepo"},{"name":"npc_dota_hero_mirana","id":9,"localized_name":"Mirana"},{"name":"npc_dota_hero_morphling","id":10,"localized_name":"Morphling"},{"name":"npc_dota_hero_naga_siren","id":89,"localized_name":"Naga Siren"},{"name":"npc_dota_hero_necrolyte","id":36,"localized_name":"Necrophos"},{"name":"npc_dota_hero_nevermore","id":11,"localized_name":"Shadow Fiend"},{"name":"npc_dota_hero_night_stalker","id":60,"localized_name":"Night Stalker"},{"name":"npc_dota_hero_nyx_assassin","id":88,"localized_name":"Nyx Assassin"},{"name":"npc_dota_hero_obsidian_destroyer","id":76,"localized_name":"Outworld Devourer"},{"name":"npc_dota_hero_ogre_magi","id":84,"localized_name":"Ogre Magi"},{"name":"npc_dota_hero_omniknight","id":57,"localized_name":"Omniknight"},{"name":"npc_dota_hero_phantom_assassin","id":44,"localized_name":"Phantom Assassin"},{"name":"npc_dota_hero_phantom_lancer","id":12,"localized_name":"Phantom Lancer"},{"name":"npc_dota_hero_phoenix","id":110,"localized_name":"Phoenix"},{"name":"npc_dota_hero_puck","id":13,"localized_name":"Puck"},{"name":"npc_dota_hero_pudge","id":14,"localized_name":"Pudge"},{"name":"npc_dota_hero_pugna","id":45,"localized_name":"Pugna"},{"name":"npc_dota_hero_queenofpain","id":39,"localized_name":"Queen of Pain"},{"name":"npc_dota_hero_rattletrap","id":51,"localized_name":"Clockwerk"},{"name":"npc_dota_hero_razor","id":15,"localized_name":"Razor"},{"name":"npc_dota_hero_riki","id":32,"localized_name":"Riki"},{"name":"npc_dota_hero_rubick","id":86,"localized_name":"Rubick"},{"name":"npc_dota_hero_sand_king","id":16,"localized_name":"Sand King"},{"name":"npc_dota_hero_shadow_demon","id":79,"localized_name":"Shadow Demon"},{"name":"npc_dota_hero_shadow_shaman","id":27,"localized_name":"Shadow Shaman"},{"name":"npc_dota_hero_shredder","id":98,"localized_name":"Timbersaw"},{"name":"npc_dota_hero_silencer","id":75,"localized_name":"Silencer"},{"name":"npc_dota_hero_skeleton_king","id":42,"localized_name":"Wraith King"},{"name":"npc_dota_hero_skywrath_mage","id":101,"localized_name":"Skywrath Mage"},{"name":"npc_dota_hero_slardar","id":28,"localized_name":"Slardar"},{"name":"npc_dota_hero_slark","id":93,"localized_name":"Slark"},{"name":"npc_dota_hero_sniper","id":35,"localized_name":"Sniper"},{"name":"npc_dota_hero_spectre","id":67,"localized_name":"Spectre"},{"name":"npc_dota_hero_spirit_breaker","id":71,"localized_name":"Spirit Breaker"},{"name":"npc_dota_hero_storm_spirit","id":17,"localized_name":"Storm Spirit"},{"name":"npc_dota_hero_sven","id":18,"localized_name":"Sven"},{"name":"npc_dota_hero_templar_assassin","id":46,"localized_name":"Templar Assassin"},{"name":"npc_dota_hero_terrorblade","id":109,"localized_name":"Terrorblade"},{"name":"npc_dota_hero_tidehunter","id":29,"localized_name":"Tidehunter"},{"name":"npc_dota_hero_tinker","id":34,"localized_name":"Tinker"},{"name":"npc_dota_hero_tiny","id":19,"localized_name":"Tiny"},{"name":"npc_dota_hero_treant","id":83,"localized_name":"Treant Protector"},{"name":"npc_dota_hero_troll_warlord","id":95,"localized_name":"Troll Warlord"},{"name":"npc_dota_hero_tusk","id":100,"localized_name":"Tusk"},{"name":"npc_dota_hero_undying","id":85,"localized_name":"Undying"},{"name":"npc_dota_hero_ursa","id":70,"localized_name":"Ursa"},{"name":"npc_dota_hero_vengefulspirit","id":20,"localized_name":"Vengeful Spirit"},{"name":"npc_dota_hero_venomancer","id":40,"localized_name":"Venomancer"},{"name":"npc_dota_hero_viper","id":47,"localized_name":"Viper"},{"name":"npc_dota_hero_visage","id":92,"localized_name":"Visage"},{"name":"npc_dota_hero_warlock","id":37,"localized_name":"Warlock"},{"name":"npc_dota_hero_weaver","id":63,"localized_name":"Weaver"},{"name":"npc_dota_hero_windrunner","id":21,"localized_name":"Windranger"},{"name":"npc_dota_hero_wisp","id":91,"localized_name":"Io"},{"name":"npc_dota_hero_witch_doctor","id":30,"localized_name":"Witch Doctor"},{"name":"npc_dota_hero_zuus","id":22,"localized_name":"Zeus"}],"count":108}}';
    
  heroes = jQuery.parseJSON(heroes_json);

  search_html += customJSONSearchDropdown('hero','','Hero (not included in search)',heroes.result.heroes);

  var hero_item = [];
  search_html += customSearchDropdown('hero_item','','Hero Item',hero_item);



  var rarity = [
    'Common','Uncommon', 
    'Rare', 'Mythical', 
    'Legendary', 'Arcana',
    'Ancient', 'Immortal'
    ];
  search_html += customSearchDropdown('rarity','','Rarity',rarity);

  var quality = [
    'Inscribed','Unusual', 
    'Elder', 'Heroic', 
    'Genuine', // 'Self-Made', 
    'Cursed', //'Favored', 
    'Autographed', //'Ascendant', 
    'Exalted', 'Frozen', 
    'Corrupted', 'Auspicious'
    ];
  search_html += customSearchDropdown('quality','','Quality',quality);


  var type = [
    'Taunt',
    // 'Action Item',
    'Announcer', 
    'Mega-Kills','Courier', 
    'Ward','HUD', 
    'Loading Screen','Chest', 
    'Key','Ticket', 
    'Gem','Recipe', 
    'Tool', 
    'Gift', //'Equipment -> New Filter',
    'Essence', 'Fan'
    ];
  type = type.sort();
  search_html += customSearchDropdown('type','','Type',type);


  var slot = [
    'Weapon','OffHand', 
    'Head','Back', 
    'Shoulder','Arms', 
    'Gloves','Neck', 
    'Belt','Armor', 
    'Legs','Tail', 
    'Mount','Taunt', 
    'Misc','Summoned Unit', 
    'Ability 1','Ability 2', 
    'Ability 3','Ability 4', 
    'Ultimate'
    ];
    slot = slot.sort();

  // search_html += customSearchDropdown('slot','','Slot',slot);


  var gem = [
    'Gem',
    'Prismatic','Inscribed', 
    'Mastery','Ethereal'
    ];
  search_html += customSearchDropdown('gem','','Gem',gem);

  


  search_html += '<div style="margin-top: 10px;"><input type="submit" name="submit" value="Custom Search" id="custom-search-submit" /> <a href="#" id="reset-custom-form">Reset</a></div>';

  $j('#market_search').append(search_html);

  $j('#holder-for-hero_item').hide();

  $j('#select-hero').change(function(e){
    updateHeroItemsList();
  });

  if($j('#select-type').val() != 'Gem')
    $j('#holder-for-gem').hide();
  
  $j('#select-type').change(function(e){
    var el = $j(this);
    if(el.val() == 'Gem') {
      $j('#holder-for-gem').show();
    } else {
      $j('#holder-for-gem').hide();
    }
  });

  if($j('#select-hero').val())
    updateHeroItemsList();

  $j('#custom-search-submit').click(function(e){
    e.preventDefault();
    performCustomSearch(570);
  })

}


function modifySteamSearchBox ()
{

  var search_html = '';


  search_html += '<div class="custom-search-item" id="holder-for-game">'
  +'<label>Game Name:</label><br/>'
  +'<input type="text" value="'+getParameterByName('game')+'" id="select-game" class="custom-search" name="game"/></div>';


  var item = [
    'Trading Card','Profile Background', 
    'Emoticon', 'Booster Pack', 
    'Foil Trading Card'
    
    ];
  search_html += customSearchDropdown('item','','Item',item);


  
  search_html += '<div style="margin-top: 10px;"><input type="submit" name="submit" value="Custom Search" class="text-field" id="custom-search-submit" /> <a href="#" id="reset-custom-form">Reset</a></div>';  
  
  $j('#market_search').append(search_html);

  $j( "#select-game" ).autocomplete({
      source: function(request, response) {
        $j.get("http://steamcommunity.com/actions/SearchApps/"+request.term, function(data) {
          var results = [];
          $j.each(data, function(key, value) {
            results.push({
              'id': value.name,
              'value': value.name
            });
          });
            response(results);
        })

     
      },
       open: function(event, ui){
       $j("ul.ui-autocomplete").addClass('popup_body').css({width: 200}).wrap( '<div class="popup_block" style="position: inherit !important; "></div>' );
       $j("ul.ui-autocomplete li").each(function(){
          /* todo: formatting */
        });
      },
      minLength: 3,
      select: function( event, ui ) {

      }
    });

  $j('#custom-search-submit').click(function(e){
    e.preventDefault();
    performCustomSearch(753);
  })

}




function performCustomSearch(id) {
  
  $j('#market_search_descriptions_checkbox').attr('checked','checked');

  var base_query = 'appid:'+id+' ';
  var query = '';
  
  if($j('#market_search_stattrak_checkbox').is(':checked') )
    query += 'StatTrak '

  $j('.custom-search-item').each(function( index ) {
    var ignore = false;
    var input_name = $j(this).find('select, input.custom-search').attr('name');
    var value = '';
    if($j(this).find('select').length) {
      value = $j(this).find(":selected").attr('value');
    } else {
      value = $j(this).find("input.custom-search").val();
    }
    
    if( input_name == 'type' && value == 'Gem')
      ignore = true;
    if( input_name == 'hero') 
      ignore = true;

    if(!ignore && value)
      query += value + ' ';
  });
  if(query)
    query = query.trim();

  $j('#findItemsSearchBox').val(base_query+query);

  $j('#findItemsSearchSubmit').click();

}

function updateHeroItemsList(){
  var hero = $j('#select-hero').val();
  if(!hero) {
    $j('#holder-for-hero_item').hide();
    return;
  } else {
    $j('#holder-for-hero_item').show();
  }

  $j('#select-hero_item').empty().append('<option>loading...</option>');
  var hero_data = null;
  hero_data = localStorage.getItem("hero_"+hero);
  hero_time = localStorage.getItem("hero_time_"+hero);
  var current_time = new Date().getTime()/1000;

  var is_fresh = false;
  if(typeof(hero_time) != 'undefined') {
    if((current_time - hero_time) < 60*60*24*5) { // if less than five days, then get local
      is_fresh = true;
    }

  }

  if(hero_data && is_fresh) {
    buildHeroItemList(hero_data);
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.github.com/bravo142/steamsearch/master/server/json/v2/"+hero+".json", true);
    xhr.onreadystatechange = function() {

      if (xhr.readyState == 4 && xhr.response ) {
          var timestamp = new Date().getTime();
          localStorage.setItem("hero_"+hero, xhr.response);
          localStorage.setItem("hero_time_"+hero, timestamp/1000);
          buildHeroItemList(xhr.response);
      }
    }
    
    xhr.send();
  }

  return;

}

function buildHeroItemList(data) {

  var items = null; 
  var default_value = getParameterByName('hero_item');
  var el = $j("#select-hero_item");
  el.empty()
  
  try {
    items = jQuery.parseJSON(data);
  } catch(e) {
      return;
  }

  var output = '';
  $j.each(items, function( index, value ) {
    output += '<optgroup label="'+index+'">';
    $j.each(value, function( index2, value2 ) {

      if (default_value.toLowerCase() == value2.toLowerCase() )
        output += '<option value="'+value2+'" selected="selected">'+value2+'</option>';
      else  
        output += '<option value="'+value2+'">'+value2+'</option>';
    });

    output += '</optgroup>';
  });


  el.html(output);


}

window.herolist = function herolist(results) {
  console.log(results);
}

function customSearchDropdown(name,id,label,options) {
  var output = '';

  var default_value = getParameterByName(name);

  output += '<div class="custom-search-item" id="holder-for-'+name+'">'
  +'<label>'+label+':</label><br/>'
  +'<select id="select-'+name+'" class="custom-search" name="'+name+'">'
  +'<option value="">--All--</option>'
  
  $j.each(options, function( index, value ) {
    if (default_value.toLowerCase() == value.toLowerCase() )
      output += '<option value="'+value+'" selected="selected">'+value+'</option>';
      else  
      output += '<option value="'+value+'">'+value+'</option>';
  });

  output += '</select></div>';

  return output;
}

function customNestedSearchDropdown(name,id,label,options) {
  var output = '';

  var default_value = getParameterByName(name);

  output += '<div class="custom-search-item" id="holder-for-'+name+'">'
  +'<label>'+label+':</label><br/>'
  +'<select id="select-'+name+'" class="custom-search" name="'+name+'">'
  +'<option value="">--All--</option>'
  
  $j.each(options, function( index, value ) {
    output += '<optgroup label="'+index+'">';
    $j.each(value, function( index2, value2 ) {

      if (default_value.toLowerCase() == value2.toLowerCase() )
        output += '<option value="'+value2+'" selected="selected">'+value2+'</option>';
      else  
        output += '<option value="'+value2+'">'+value2+'</option>';
    });

    output += '</optgroup>';
  });

  output += '</select></div>';

  return output;
}

function customJSONSearchDropdown(name,id,label,options) {
  var output = '';

  var searchString = $j('#findItemsSearchBox').val();

  output += '<div class="custom-search-item" id="holder-for-'+name+'">'
  +'<label>'+label+':</label><br/>'
  +'<select id="select-'+name+'" class="custom-search" name="'+name+'">'
  +'<option value="">--All--</option>'
  var default_value = getParameterByName(name);

  $j.each(options, function( index, value ) {
    if (  default_value == value.name )
      output += '<option value="'+value.name+'" selected="selected">'+value.localized_name+'</option>';
      else  
      output += '<option value="'+value.name+'">'+value.localized_name+'</option>';
  });

  output += '</select></div>';

  return output;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}