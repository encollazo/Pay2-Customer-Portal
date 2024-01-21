$(document).ready(function() {
	var $wizard = $('.js--wizard');
	var $CustomPaymentWizard = $('.js--customPaymentWizzard')
	var $dataTable = $('.js--dataTable');
	var $checkedAll = $('.js--checked-all');
	var $checkAll = $('.js--check-all');
	var $datePicker = $('.js--datePicker');
	var $cardOptions = $('.js--cardOptions');
	var $customNav = $('.js--customTabNav');
	var $tableCheckbox = $('tbody .checkbox');
	var $tableTr = $('tr');
	var $amountInput = $('.js--amount > input');
	var $input = $('input');
	var $button = $('button');
	var $balanceDue = $('.js--balance');
	var $checkboxInput = $('.checkbox > input');
	var $checkTerms = $('.js--checkbox-terms');
	var $pagerNext = $('.pager .next');
	var $pagerPrevious = $('.pager .previous');
	var $modalLinkAccountForm = $('#modalLinkAccountForm');
	var $modalLinkAccountTable = $('#modalLinkAccountTable');
	var $modalNewPaymentPlan = $('#modalNewPaymentPlan');
	var $modalPaymentPlanInvoices = $('#modalPaymentPlanInvoices');
	var $radio = $('.js--radio');
	var $radioMethod = $('.js--radioMethod');
	var $checkboxTerms = $('.js--checkboxTerms');
	var $btnAcceptPlan = $('.js--btnAcceptPlan');
	var $btnExport = $('.js--btnExport');
	var $modalConfirm = $('#modalConfirm');
	var $modalComplete = $('#modalComplete');
	var $userStatus = $('.js--userStatus');
	var $checkBoxPopup = $('.js--checkboxPopup');
	var $formCalculate = $('.js--formCalculate');
	var $btnAcceptPlanPayment = $('.js--btnAcceptPlanPayment');
	var thead = 'thead';
	var tbody = 'tbody';
	var disableClass = 'disabled';
	var checked = 'checked';
	var hiddenClass = 'hidden';
	var formControlClass = '.form-control';
	var ascending = 'asc';
	var descending = 'desc';
	var show = 'show';
	var hide = 'hide';
	var dataTableSortColumn = 'th.sort';
	var hintText = 'hint-text';
	var listAltIcon = 'fa-list-alt';
	var creditCardIcon = 'fa-credit-card';
	var checkCircleIcon = 'fa-check-circle-o';
	var flagIcon = 'fa-flag-checkered';

	//Form validation
	$('.js--form-validation').each(function() {
		$(this).validate();
	});

	window.initDataTables = function($tables) {
		$tables.each(function() {
			var $this = $(this);
			var sortColumnIndex = 0; //Default value '0'

			var sortColumnOrder = descending; //Default value 'desc'

			var infoValue = $this.data('info');
			var pagingValue = $this.data('paging');
			var sortValue = $this.data('sort');

			if (infoValue === undefined) {
				infoValue = false;
			}

			if (sortValue === undefined) {
				sortValue = true;
			}

			if (pagingValue === undefined) {
				pagingValue = false;
			}

			if ($this.find(dataTableSortColumn).length > 0) {
				sortColumnIndex = $this.find(dataTableSortColumn).index();
			}

			if ($this.find(dataTableSortColumn).hasClass(ascending)) {
				sortColumnOrder = ascending;
			}

			var settings = {
				dom: "<t><'row'<p i>>",
				destroy: true,
			    "sPaginationType": "bootstrap",
				scrollCollapse: true,
				paging: pagingValue,
				lengthChange: false,
				info: infoValue,
				ordering: sortValue,
				language: {
					info: "Displaying _PAGE_ - _PAGES_ of _TOTAL_ Results"
				},
				order: [sortColumnIndex, sortColumnOrder],
				columnDefs: [
					{
						targets: 'sorting_disabled',
						orderable: false
					},
					{
						targets: 'search_disabled',
						searchable: false
					}
				],
				dom: 'Bfrtip',
				buttons: [
					'excel'
				]
			};

			$this.dataTable(settings);
		});
	}

	function initDatepickers($datepickerDiv) {
		$datepickerDiv.datepicker({
			format: 'mm/dd/yyyy',
		});
	}

	//Card Options
	if ($cardOptions.length > 0) {
		$cardOptions.card();
	}

	//Data Table
	if ($dataTable.length > 0) {
		initDataTables($dataTable);
	}

	if($datePicker.length > 0) {
		initDatepickers($datePicker);
	}

	$('.js--datePicker').find('[start-date="today"]').each(function() {
		var date = new Date();

		var month = date.getMonth()+1;
		var day = date.getDate();
		var year = date.getFullYear();

		var output = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + '/' + year;

		$(this).val(output);
	});

	$('.js--exportToExel').on('click', function() {
		$dataTable.siblings().find('.buttons-excel').trigger("click");
	});

	$('.switchery').on('click', function(event) {
		var $userStatusToggle = $(this).prev('.js--userStatusToggle');
		var isChecked = $userStatusToggle.prop('checked');

		if ($userStatusToggle.length > 0) {
			if(!isChecked) {
				$userStatusToggle.trigger('click');

				$('#modalDeactivateUser').modal(show);
			} else {
				$userStatus.val('Activated');
			}
		}
	});

	$('.js--deactivateUser').on('click', function() {
		$userStatus.val('Deactivated');

		$userStatus.parent().find('.js--userStatusToggle').trigger('click');
	});

	$customNav.on('click', '.btn', function(){
		$(this).siblings().removeClass('active');
	});

	$tableCheckbox.on('click', function() {
		var $this = $(this);

		if (!$this.find($input).prop(checked)) {
			$checkAll.find($input).prop(checked, false);
		}
	});

	//Payment Tabs
	$('#paymentTabs a').on('click', function(event) {
		$(this).tab(show);

		event.preventDefault();
	});

	$modalConfirm.find('.js--confirm').on('click', function() {
		if(!($('.js--confirm').hasClass('disabled'))) {
			$wizard.find('.pager .next').find($button).trigger('click');
		}
	});

	$('.js--checkboxAgree').on('click', 'label', function() {
		$('.js--confirm').toggleClass('disabled');
	})

	//Wizard
	if ($wizard.length > 0) {
		var onPrevious = 0;
		var tabPrevious = 0;
		var onNext = 0;

		$wizard.bootstrapWizard({
			onNext: function(tab, navigation, index) {
				var currentStep = index - 1;
				var nextOption = $('.tab-content').find('.tab-pane').eq(currentStep).data('next');

				if ($wizard.find('.pager .next').find($button).hasClass(disableClass)) {
					return false;
				}

				if(nextOption === 'modal-confirm') {
					if ($modalConfirm.hasClass(show)) {
						$modalConfirm.modal(hide);
					} else {
						$modalConfirm.modal(show);

						return false;
					}
				}

				onPrevious = 0;
				onNext = 1;
			},

			onPrevious: function(tab, navigation, index) {
				onPrevious = 1;
				onNext = 0;
				tabPrevious = 0;
			},

			onTabClick: function(tab, navigation, index) {
				var total = navigation.find('li').length;
				var currentStep = index + 1;

				$wizard.find('.nav .nav-item').on('click', function() {
					var $this = $(this);

					var tabIndex = $this.index() + 1;

					if (currentStep >= total) {
						return false;
					}

					if (tabIndex > currentStep) {
						if (!$this.hasClass('visited')) {
							return false;
						}
					}

					onNext = 0;
					onPrevious = 0;
					tabPrevious = 1;
				});
			},

			onTabShow: function(tab, navigation, index) {
				var $total = navigation.find('li').length;
				var currentStep = index + 1;
				var $tabActive = $('.tab-content').first().children('.tab-pane').eq(currentStep - 1);
				var classBtnPrimary = 'btn-primary';
				var classBtnSuccess = 'btn-success';
				var li = navigation.find('li.active');
				var $btnNext = $wizard.find($pagerNext).find($button);
				var $btnPrev = $wizard.find($pagerPrevious).find($button);
				var $tab = tab;
				var $jsWizzard = $(tab).closest('.js--wizard');
				var activeTabText = $(tab).find('a span').text();
				var $csPlaceholder = $jsWizzard.find('.nav-tab-dropdown .cs-placeholder');
				var nextStepOption = $tabActive.data('next-step');
				var nextUnlock = $tabActive.data('next-unlock');
				var prevBtnStatus = $tabActive.data('previous');
				var nextBtnText = $tabActive.data('next-text');
				var nextBtnIcon = navigation.find('.active').closest('.nav-item').next().find('[data-toggle="tab"]').data('icon');
				var prevBtnIcon = navigation.find('.active').closest('.nav-item').prev().find('[data-toggle="tab"]').data('icon');
				var activeIcon = navigation.find('.active').data('icon');

				$csPlaceholder.text(activeTabText);

				$tab.addClass('visited');

				$tab.find('a').removeClass(hintText).closest('li').siblings().children('a').addClass(hintText);

				$tab.find('a').hover(function() {
					var $this = $(this);

					if (!$this.hasClass('active')) {
						$this.toggleClass(hintText);
					}
				});

				if(!(nextBtnText == undefined)){
					$btnNext.removeClass(classBtnPrimary).addClass(classBtnSuccess).find('span').text(nextBtnText);
				} else {
					$btnNext.removeClass(classBtnSuccess).addClass(classBtnPrimary).find('span').text("Next");
				}

				if (nextStepOption === 'disable') {
					$btnNext.addClass(disableClass);
				} else {
					$btnNext.removeClass(disableClass);
				}

				if (nextUnlock === 'checked') {
					unlockNextCheck($tabActive);
				}

				if (nextUnlock === 'insert') {
					unlockNextInsert($tabActive);
				}

				if (nextUnlock === 'radioGroup') {
					nextBtnRadioOptions($tabActive);
				}

				if (nextUnlock === 'equalАmounts') {
					equalАmounts($tabActive);
				}

				$btnPrev.toggleClass('btn-animated from-left', !(currentStep == 1));

				$btnNext.removeClass(activeIcon).addClass(nextBtnIcon);

				$btnPrev.removeClass(activeIcon).addClass(prevBtnIcon);

				$wizard.find('.js--finishBtn').toggleClass(hiddenClass, !(currentStep >= $total));

				if (!(prevBtnStatus == true)) {
					$btnPrev.toggleClass(hiddenClass, currentStep >= $total);
				}

				$btnNext.toggleClass(hiddenClass, currentStep >= $total);
			}
		});
	}

	//Clear Search Field in Select2
	$('*[data-init-plugin="select2"]').each(function() {
		var $this = $(this);
		var searchData = $this.data('search');

		if (searchData === 'no') {
			$this.select2({
				minimumResultsForSearch: Infinity
			});
		}
	});

	$('.js--unlock').on('click', function() {
		unlockNextCheck($(this).closest('.tab-pane'));
	});

	$('.js--insertUnlock').on('keyup', function() {
		unlockNextInsert($(this).closest('.tab-pane'));
	});

	$('.js--selectDate').on('change', function() {
		equalАmounts($(this).closest('.tab-pane'));
	});

	$('.js--sumFields').on('keyup', function() {
		equalАmounts($(this).closest('.tab-pane'));
	});

	$('.js--changeTab').on('click', function() {
		var $this = $(this);
		var index = $this.index();
		var $activeTab = $this.parent().siblings('.tab-content').find('.tab-pane').eq(index);

		$activeTab.addClass('active').siblings().removeClass('active');

		equalАmounts($activeTab);
	});

	$('.js--select').on('change', function(){
		equalАmounts($(this).closest('.tab-pane'));
	});

	function unlockNextInsert(tabActive) {
		$wizard.find('.pager .next').find($button).toggleClass(disableClass, !(tabActive.find('.js--insertUnlock').val().length > 0));
	};

	function unlockNextCheck(tabActive) {
		var count = 0;

		tabActive.find('.js--unlock').each(function(){
			if($(this).prop('checked')){
				count++;
			}
		});

		$wizard.find('.pager .next').find($button).toggleClass(disableClass, count === 0);
	}

	function equalАmounts(tabActive) {
		var error = 0;
		var totalAmount = parseInt($('.js--totalPlanAmount').text().replace(',', ''));
		var insertAmount = 0;
		var tabInner = $('.js--select').closest('.tab-pane').hasClass('active');

		tabActive.find('.js--select').each(function(){
			if($(this).val().length === 0) {
				error = 1;
			}
		});

		tabActive.find('.js--sumFields').each(function(){
			insertAmount = insertAmount + parseInt($(this).val(), 10);
		});

		if (tabActive.find('.js--sumFields').length > 0) {
			$wizard.find('.pager .next').find($button).toggleClass(disableClass, !(error === 0 && (totalAmount - insertAmount) === 0 && tabInner === true));

			if (!(error === 0 && (totalAmount - insertAmount) === 0 && tabInner === true)) {
				$('.js--totalPlanAmountBorder').removeClass('bg-success').addClass('bg-danger');
				$('.js--totalPlanAmountColor').removeClass('text-success').addClass('text-danger');
			} else {
				$('.js--totalPlanAmountBorder').removeClass('bg-danger').addClass('bg-success');
				$('.js--totalPlanAmountColor').removeClass('text-danger').addClass('text-success');
			}

		} else {
			$wizard.find('.pager .next').find($button).toggleClass(disableClass, !(error === 0 && tabInner === true));
		}
	}

	$('.js--radioOptions').on('change', 'input', function(){
		var $this = $(this).closest('.js--radioOptions');

		$this.find('.js--optionInput').removeClass('hidden');
		$this.siblings().find('.js--optionInput').addClass('hidden');

		nextBtnRadioOptions($(this).closest('.tab-pane'));
	});

	function nextBtnRadioOptions (tabActive) {
		var countSelect = 0;
		var countGroup = 0;

		tabActive.find('.js--radioOptionsGroup').each(function() {
			var $this = $(this);

			$this.find('.js--radioOptions').each(function() {
				var $this = $(this);

				if ($this.find('input').prop('checked')) {
					countSelect++;
				}
			});

			countGroup++;
		});

		$wizard.find('.pager .next').find($button).toggleClass(disableClass, !(countGroup <= countSelect));
	}

	var count = 2;

	$('.js--addFormGroup').on('click', function(event) {
		var $formActions = $(this).closest('.js--formActions');
		var formGroupTemplate = $('#form-group-template').html();
		var $formGroupContent = $(formGroupTemplate);

		var $formGroup = $formGroupContent.clone();

		$formGroup.find(formControlClass).attr('id', function(i, val) { return val + count }).end()
					.find(formControlClass).attr('name', function(i, val) { return val + count })

		$formGroup.find('.js--groupTitle').append(' ' + count);

		$formActions.before($formGroup);

		initDatepickers($formGroup.find('.js--datePicker'));

		equalАmounts($formActions.closest('.tab-pane'));

		count++;
	});

	var count = 4;

	$('.js--addRow').on('click', function(event) {
		var $this = $(this);
		var $formActions = $(this).closest('.js--formActions');
		var formRowTemplate = $('#form-row-template').html();
		var $formRowContent = $(formRowTemplate);

		var $formRow = $formRowContent.clone();

		$formRow.find(formControlClass).attr('id', function(i, val) { return val + count }).end()
					.find(formControlClass).attr('name', function(i, val) { return val + count })

		$this.before($formRow);

		count++;

		if(count > 5) {
			$this.attr('disabled', true).addClass('disabled');
		}
	});

	$('body').on('click', '.js--removeFormGroup', function(event){
		$(this).closest('.form-section').remove();

		event.preventDefault();
	});

	//Select all checkbox
	$checkedAll.on('click', function(event) {
		var $localTabPane = $(this).closest('.tab-pane');

		if ($(this).find($input).prop(checked)) {
			$dataTable.find($tableCheckbox).each(function() {
				var $this = $(this);
				var balance = parseInt($this.closest($tableTr).find($balanceDue).text().replace(',', ''));

				$this.find($input).prop(checked, true);

				$this.closest($tableTr).find($amountInput).val(balance);

				totalPayment();

				unlockNextCheck($localTabPane);
			});
		} else {
			$dataTable.find($tableCheckbox).each(function() {
				var $this = $(this);

				$this.find($input).prop(checked, false);

				$this.closest($tableTr).find($amountInput).val('');

				totalPayment();

				unlockNextCheck($localTabPane);
			});
		}
	});

	$dataTable.find($tableCheckbox).on('click', function(event) {
		var $this = $(this);
		var $row = $this.closest($tableTr);
		var balance = parseInt(
			$row.find($balanceDue).text().replace(',', ''), 10);

		if ($this.find($input).prop(checked)) {
			$row.find($amountInput).val(balance);
			totalPayment();
		} else {
			$row.find($amountInput).val('');
			totalPayment();
		}

		unCheckAll();
	});

	//Change amount to pay value
	$dataTable.find($amountInput).each(function() {
		var $this = $(this);

		$this.on('input', function() {
			totalPayment();
			wizardBtn();

			amountVal = $this.val();

			if (!$.isNumeric(amountVal)) {
				amountVal = 0;
			}

			if (parseInt(amountVal, 10) === 0 || amountVal === '') {
				$this
					.closest($tableTr)
					.find($checkboxInput)
					.prop(checked, false);
				unCheckAll();
				wizardBtn();
			} else {
				$this
					.closest($tableTr)
					.find($checkboxInput)
					.prop(checked, true);
			}
		});
	});

	/**
	 * addCommas Number Formatting
	 * @param {[type]} nStr [description]
	 */
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	/**
	 * totalPayment sum amount to pay value
	 */
	function totalPayment() {
		var totalPayment = 0;

		$dataTable.find($amountInput).each(function() {
			var $this = $(this);

			if (!$this.val() == '') {
				amountVal = parseInt($this.val(), 10);
			} else {
				amountVal = 0;
			}

			if (!$.isNumeric(amountVal)) {
				amountVal = 0;
			}

			totalPayment = totalPayment + amountVal;
		});

		$('.js--total-payment').text(addCommas(totalPayment.toFixed(2)));
	}

	/**
	 * unCheckAll checking for checkbox checked
	 */
	function unCheckAll() {
		var check = true;

		$dataTable.find('tbody .checkbox > input').each(function() {
			var $this = $(this);

			check = $this.prop(checked);

			if (check) {
				$checkedAll.find($input).prop(checked, false);
			}
		});
	}

	$modalLinkAccountForm.find($input).on('input', function() {
		nextStep();
	});

	/**
	 * nextStep enable/disable "next" button in modal "Link Accounts".
	 */
	function nextStep() {
		error = 0;

		$modalLinkAccountForm.find($input).each(function() {
			var $this = $(this);

			if ($this.val().length === 0) {
				error = 1;
			}
		});

		if (error === 0) {
			$modalLinkAccountForm.find('.js--next').removeAttr(disableClass);
		} else {
			$modalLinkAccountForm.find('.js--next').attr(disableClass, true);
		}
	}

	$dataTable.find('.checkbox').on('click', function() {
		var $this = $(this);

		var error = 1;

		$dataTable.find('.checkbox').each(function() {
			var $this = $(this);

			if ($this.find($input).prop(checked)) {
				error = 0;
			}
		});

		if (error === 0) {
			$modalPaymentPlanInvoices
				.find('.js--btnUpdate')
				.removeAttr(disableClass);
			$btnExport.removeAttr(disableClass);
		} else {
			$modalPaymentPlanInvoices
				.find('.js--btnUpdate')
				.attr(disableClass, true);
			$btnExport.attr(disableClass, true);
		}
	});

	$radio.on('click', function() {
		var $this = $(this);
		var $radio = $this.find('.radio input');
		var $check = $this.find('.radio input').prop(checked);

		if (!$check) {
			$radio.prop(checked, true);
			$this.removeClass('bg-master-lighter').addClass('bg-primary');
			$this
				.parent()
				.siblings()
				.find('.js--radio')
				.removeClass('bg-primary')
				.addClass('bg-master-lighter');
		}

		acceptPlan();
	});

	$radioMethod.on('click', function() {
		acceptPlan();
	});

	$checkboxTerms.on('click', function() {
		acceptPlan();
	});

	function acceptPlan() {
		var complete = 0;

		//check for select plan options
		$radio.find('.radio input').each(function() {
			if ($(this).prop(checked)) {
				complete++;
			}
		});

		//check for select payment method
		$radioMethod.find($input).each(function() {
			if ($(this).prop(checked)) {
				complete++;
			}
		});

		if ($checkboxTerms.find($input).prop(checked)) {
			complete++;
		}

		if (complete === 3) {
			$btnAcceptPlan.removeAttr(disableClass);
		} else {
			$btnAcceptPlan.attr(disableClass, true);
		}
	}

	$modalLinkAccountTable.find('table > tbody').on('click', '.checkbox', function() {
		nextBtn();
	});

	$modalNewPaymentPlan.find('table > tbody').on('click', '.checkbox', function() {
		nextBtn();
	});

	$('.js--checkAllCheckboxes').on('click', function() {
		var $this = $(this);

		$this.closest('thead').next().find('.js--unlockNextCheckbox').find('input').prop('checked', $this.find('input').prop('checked'));

		nextBtn();
	});

	function nextBtn() {
		var count = 0;

		$('.js--unlockNextCheckbox').each(function() {
			if($(this).find('input').prop('checked')) {
				count++;
			}
		});

		if (count > 0) {
			$('.js--btnNewPaymentPlan').removeAttr(disableClass).removeClass('disabled');
		} else {
			$('.js--btnNewPaymentPlan').attr(disableClass, true).addClass('disabled');
		}
	}

	$('.alert').each(function() {
		var $this = $(this);

		if (!$this.hasClass('alert-danger')) {
			setTimeout(function() {
				$this.closest('.push-on-sidebar-open').fadeOut(500, function() {
					$(this).remove();
				});
			}, 5000);
		}
	});

	//Hide Payment Method Radios
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		var $this = $(this);
		var checkTab = $this.hasClass('js--paymentMethodTab');

		$('.js--paymnetMethodRadios').toggleClass('hidden', checkTab);
	});

	//Tabs sliding animation
	$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
		e = $(e.target).parent().find('a[data-toggle=tab]');

		var hrefCurrent = e.data('target');
		if(hrefCurrent === undefined){
			hrefCurrent = e.attr('href');
		}

		if (!$(hrefCurrent).is('.slide-left, .slide-right')) return;
		$(hrefCurrent).addClass('sliding');

		setTimeout(function() {
			$(hrefCurrent).removeClass('sliding');
		}, 100);
	});

	$('.js--radioBtn').on('click', function(event) {
		var $this = $(this);
		var isChecked = $this.find('input[type=radio]').prop(checked);

		if (isChecked) {
			$this.find(formControlClass).removeAttr('disabled');

			$this.siblings().find('input').prop(checked, false).end().find(formControlClass).attr('disabled', true).val('');

			acceptPlanPayment();
		}
	});

	$('.js--radioBtnSecondary').on('click', function(event) {
		var $this = $(this);
		var isChecked = $this.find('input[type=radio]').prop(checked);

		if (isChecked) {
			$this.find('.radio-input').removeClass('hidden');

			$this.closest('.radio').siblings().find('.radio-input').addClass('hidden');
		}
	});

	$('.js--selectGateway').find('select').on('change', function() {
		var $this = $(this);
		var selectVal = $this.val();

		$this.closest('.form-group').siblings('.input-optional').toggleClass('hidden', !(selectVal == 'new'));
	});

	$('#modalSetupAutopay').on('shown.bs.modal', function(){
		var error = 1;

		$('.js--paymentAccount').find('option').each(function() {
			if ($(this).val().length > 0) {
				error = 0;
			}
		});

		if (error === 1) {
			$('.js--paymentMethodBtn').removeClass('hidden');

			$('.js--formError').removeClass('hidden');
		}
	});


	$radioMethod.on('click', function(event) {
		acceptPlanPayment();
	});

	$checkBoxPopup.on('click', function(event) {
		acceptPlanPayment();
	});

	$formCalculate.find('.js--datePicker input').on('change', function() {
		acceptPlanPayment();
	});

	$formCalculate.find('.js--radioBtn').on('click', function() {
		acceptPlanPayment();
	});

	$formCalculate.find('.js--radioBtn .form-control').on('input', function() {
		acceptPlanPayment();
	});

	/**
	 * acceptPlanPayment validate page
	 */
	function acceptPlanPayment() {
		var complete = 0;

		var datePickerIsEmpty = !($formCalculate.find('.js--datePicker input').val().length > 0);

		if (!(datePickerIsEmpty)) {
			complete++;
		}

		$('.js--radioGroup').find('.js--radioBtn').each(function() {
			var $this = $(this);

			if($this.find('input[type=radio]').prop(checked)) {
				if ($this.find(formControlClass).val().length > 0) {
					complete++;
				}
			}
		});

		$radioMethod.each(function() {
			if($(this).find('input[type=radio]').prop(checked)) {
				complete++;
			}
		});

		if ($checkBoxPopup.find('input').prop(checked)) {
			complete++;
		}

		if (complete === 4) {
			$btnAcceptPlanPayment.removeAttr(disableClass);
		} else {
			$btnAcceptPlanPayment.attr(disableClass, true);
		}
	}

	$('.summernote').each(function() {
		$(this).summernote();
	});

	// Initializes search overlay plugin.
	// Replace onSearchSubmit() and onKeyEnter() with
	// your logic to perform a search and display results
	$('[data-pages="search"]').search({
		searchField: '#overlay-search',
		closeButton: '.overlay-close',
		suggestions: '#overlay-suggestions',
		brand: '.brand',
		onSearchSubmit: function(searchString) {
			console.log('Search for: ' + searchString);
		},
		onKeyEnter: function(searchString) {
			console.log('Live search for: ' + searchString);
			var searchField = $('#overlay-search');
			var searchResults = $('.search-results');
			clearTimeout($.data(this, 'timer'));
			searchResults.fadeOut('fast');
			var wait = setTimeout(function() {
				searchResults.find('.result-name').each(function() {
					if (searchField.val().length != 0) {
						$(this).html(searchField.val());
						searchResults.fadeIn('fast');
					}
				});
			}, 500);
			$(this).data('timer', wait);
		}
	});
});
