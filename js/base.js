var APP = APP || {};

/* ========================
	Question Class
==========================*/
var Question = function() {
	// console.log('Create Question');
	var _this = this;
	var rnd = Math.floor((Math.random() * APP.questions.length));
	var data = APP.questions[rnd];
	_this.question = data.question;
	_this.equals = data.equals;
	_this.answer = data.answer;
	_this.buildHTML();
	$('[answer]').unbind('click').click(function(e) { _this.checkAnswer(e); });
	APP.stopTimer();
	APP.startTimer();
};
Question.prototype.buildHTML = function() {
	// console.log('Build Question HTML');
	var _this = this;
	var target = $('[question]');
	_this.html = $('[template="question"]').clone(true);
	_this.html.removeAttr('template');
	_this.html.find('[equation]').html(_this.question);
	_this.html.find('[equals]').html(_this.equals);
	target.append(_this.html);
	_this.html.animate({
		right: '0'
	}, 100);
};
Question.prototype.checkAnswer = function(e) {
	// console.log('Check Answer');
	var _this = this;
	var button = $(e.currentTarget);
	var answer = button.attr('answer');
	if (answer == _this.answer)
	{
		// console.log('Correct');
		APP.score = APP.score + 1;
		$('[score]').html(APP.score);
		APP.stopTimer();
		_this.html.addClass('leaving');
		new Question();
		_this.html.animate({
			right: '100%'
		}, 100, function() {
			_this.html.remove();
		});
	}
	else 
	{
		// console.log('Wrong');
		APP.stop();
	}
}

var questions = [
	{
		question: '2+4',
		equals: '=6',
		answer: 'true'
	},
	{
		question: '5+4',
		equals: '=10',
		answer: 'false'
	},
	{
		question: '6+1',
		equals: '=7',
		answer: 'true'
	},
	{
		question: '8+4',
		equals: '=12',
		answer: 'true'
	},
	{
		question: '1+12',
		equals: '=13',
		answer: 'true'
	},
	{
		question: '1+1',
		equals: '=3',
		answer: 'false'
	},
	{
		question: '6+10',
		equals: '=16',
		answer: 'true'
	},
	{
		question: '8+2',
		equals: '=9',
		answer: 'false'
	},
	{
		question: '10+4',
		equals: '=13',
		answer: 'false'
	},
	{
		question: '3+2',
		equals: '=6',
		answer: 'false'
	},
	{
		question: '1+1',
		equals: '=2',
		answer: 'true'
	},
	{
		question: '8+7',
		equals: '=15',
		answer: 'true'
	},
	{
		question: '10+5',
		equals: '=13',
		answer: 'false'
	},
];

var color_bg = [
	'#2970B5',
	'#731B96',
	'#B5D608',
	'#BD2A07',
	'#9107A9',
	'#BD0E5D',
	'#12C352',
	'#54A20E',
	'#32667B',
	'#B3790B',
	'#81B30B'
];

APP = {
	score: 0,
	best: 0,
	time_limit: 1400,
	timer: '',
	timer_html: '<div class="timer" timer></div>',
	questions: questions,
	bg_colors: color_bg,
	popout: $('[popout]'),
	init: function() {
		// console.log('Lets Math!');
		var _this = this;
		this.score = 0;
		$('[score]').html(_this.score);
		new Question();
		var rnd_color = Math.floor((Math.random() * _this.bg_colors.length));
		$('[layout]').removeClass('shake');
		$('[layout]').attr('style', 'background-color:'+_this.bg_colors[rnd_color]);
		// window.addEventListener('mouseup', this.clickEffect.bind(this), true);
		$('[play-again]').unbind('click').click(function() { _this.startOver(); });
		$('[show-app-info]').unbind('click').click(function() { _this.showInfo(); });
		$('[close-info]').unbind('click').click(function() { _this.hideInfo(); });
	},
	startOver: function() {
		// console.log('Start Over');
		var _this = this;
		$('[score]').html(_this.score);
		$('[question]').html('');
		$('[gameover]').removeClass('display');
		_this.init();
	},
	stop: function() {
		var _this = this;
		// console.log(this);
		// console.log('Stopped');
		$('[layout]').addClass('shake');
		$('[answer]').unbind('click');
		$('[gameover]').addClass('display');
		$('[score]').html(_this.score);
		if (_this.score > _this.best)
		{
			_this.best = _this.score;
		}
		$('[best]').html(_this.best);
		window.clearTimeout(_this.timer);
		APP.stopTimer();
	},
	startTimer: function() {
		// console.log('Start Timer');
		var _this = this;
		if (_this.score > 0) {
			$('[timer]').addClass('countdown');
			window.clearTimeout(_this.timer)
			_this.timer = window.setTimeout(function() {
				APP.stop();
			}, _this.time_limit );
		}
	},
	stopTimer: function() {
		// console.log('Stop Timer');
		var _this = this;
		$('[timer]').remove();
		$('[layout]').prepend(_this.timer_html);
	},
	showInfo: function() {
		$('[overlay]').addClass('display');
		$('[app-info]').addClass('display');
	},
	hideInfo: function() {
		$('[overlay]').removeClass('display');
		$('[app-info]').removeClass('display');
	}
	// clickEffect: function(e) {
	// 	var target = $('[clicked]');
	// 	var top = e.clientY-5;
	// 	var left = e.clientX-5;
	// 	var style = 'top:'+top+'px; left:'+left+'px';
	// 	target.attr('style', style);
	// 	target.addClass('animate');
	// 	setTimeout(function() {
	// 		target.removeClass('animate');
	// 	}, 310);		
	// }
};




APP.init();