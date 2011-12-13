jQuery ->
  $('.magicomplete ul li a.close').live('click', (e) ->
    for i in [0..(magicomplete_selected.length - 1)]
      if magicomplete_selected[i].category == $(e.currentTarget).parent().data().category && magicomplete_selected[i].label == $(e.currentTarget).parent().data().label
        magicomplete_selected.splice(i, 1)
        $(e.currentTarget).parent().remove()
        return false
  )
  
  display_magicomplete_bar = (obj) ->
    obj.children().remove('.entry')
    for item in magicomplete_selected.reverse()
        do (item) ->
          obj.prepend '<li class="entry" data-label="'+item.label+'" data-category="'+item.category+'">' + item.label + '<a href="#" close="close" class="close">&times;</a><br/><span class="category">' + item.category + '</span></li>'
    magicomplete_selected.reverse()
  
  $.widget "custom.magicomplete", $.ui.autocomplete,
    _init: ->
      display_magicomplete_bar($('.magicomplete ul'))
    _renderMenu: (ul, items) ->
      self = this
      currentCategory = ""
      $.each items, (index, item) ->
        unless item.category is currentCategory
          ul.append "<li class='ui-autocomplete-category'>" + item.category + "</li>"
          currentCategory = item.category
        self._renderItem ul, item

  $('.magicomplete input.search').magicomplete({
    delay: 0,
    source: data
    select: (event, ui) ->
      magicomplete_selected.push { label: ui.item.label, category: ui.item.category }
      display_magicomplete_bar($('.magicomplete ul'))
      false
  })