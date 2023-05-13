$(document).ready(() => {
    refreshTable();

    $('form').submit((e) => {
        e.preventDefault();
        const name = $('#name').val();
        const age = $('#age').val();
        const gender = $('#gender').val();
        const email = $('#email').val();
        $.ajax({
            url: '/persons',
            method: 'POST',
            data: JSON.stringify({ name, age, gender, email }),
            contentType: 'application/json',
            success: () => {
                refreshTable();
            }
        });
    });

    $(document).on('click', '.edit', function () {
        const id = $(this).data('id');
        const tr = $(this).closest('tr');
        const name = tr.find('.name').text();
        const age = tr.find('.age').text();
        const gender = tr.find('.gender').text();
        const email = tr.find('.email').text();
        const modal = $('#edit-modal');
        modal.find('#edit-id').val(id);
        modal.find('#edit-name').val(name);
        modal.find('#edit-age').val(age);
        modal.find('#edit-gender').val(gender);
        modal.find('#edit-email').val(email);
        modal.modal('show');
    });

    $('#edit-form').submit((e) => {
        e.preventDefault();
        const id = $('#edit-id').val();
        const name = $('#edit-name').val();
        const age = $('#edit-age').val();
        const gender = $('#edit-gender').val();
        const email = $('#edit-email').val();
        $.ajax({
            url: `/persons/${id}`,
            method: 'PUT',
            data: JSON.stringify({ name, age, gender, email }),
            contentType: 'application/json',
            success: () => {
                refreshTable();
                $('#edit-modal').modal('hide');
            }
        });
    });

    $(document).on('click', '.delete', function () {
        const id = $(this).data('id');
        if (confirm(`Are you sure you want to delete person with ID ${id}?`)) {
            $.ajax({
                url: `/persons/${id}`,
                method: 'DELETE',
                success: () => {
                    refreshTable();
                }
            });
        }
    });

    function refreshTable() {
        $.ajax({
            url: '/persons',
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                const tbody = $('#persons tbody');
                tbody.empty();
                for (const person of data) {
                    const tr = $('<tr>');
                    tr.append($('<td>').text(person.id));
                    tr.append($('<td>').addClass('name').text(person.name));
                    tr.append($('<td>').addClass('age').text(person.age));
                    tr.append($('<td>').addClass('gender').text(person.gender));
                    tr.append($('<td>').addClass('email').text(person.email));
                    tr.append($('<td>').html(`
                            <button class="edit" data-id="${person.id}">Edit</button>
                            <button class="delete" data-id="${person.id}">Delete</button>
                        `));
                    tbody.append(tr);
                }
            }
        });
    }
});