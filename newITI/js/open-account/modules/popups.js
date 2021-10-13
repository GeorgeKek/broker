OpenAcc.popups =
{
	show(popup)
	{
		$('._overlay').addClass('_show');
		$('body').addClass('ow-hidden');
		$(popup).addClass('_show');
		setTimeout(()=>
		{
			this.addClickOutside(popup);
			this.closeOnKeyUp(popup);
		}, 10);
	},
	close(popup)
	{
		$(popup).removeClass('_show');
		$('._overlay').removeClass('_show');
		$('body').removeClass('ow-hidden');
		this.removeClickOutside();
		OpenAcc.removePdf();
	},
	remove(popup)
	{
		$(popup).remove();
	},
	removeClickOutside()
	{
		$(document).off('click');
	},
	addClickOutside(popup)
	{
		$(document).on('click',(e)=>
		{
			if ($(e.target).closest(popup).length) return;
			this.close(popup);
		});
	},
	closeOnKeyUp: function(popup)
	{
		$(document).on('keyup', (e)=>
		{
			if (event.keyCode === 27)
				this.close(popup);
		});
	},
};