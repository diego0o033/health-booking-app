"""empty message

Revision ID: 4397351169f9
Revises: 
Create Date: 2024-08-14 07:09:42.495229

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4397351169f9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('professional',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('state', sa.Enum('ARTIGAS', 'CANELONES', 'CERRO_LARGO', 'COLONIA', 'DURAZNO', 'FLORES', 'FLORIDA', 'LAVALLEJA', 'MALDONADO', 'MONTEVIDEO', 'PAYSANDU', 'RIO_NEGRO', 'RIVERA', 'ROCHA', 'SALTO', 'SAN_JOSE', 'SORIANO', 'TACUAREMBO', 'TREINTA_Y_TRES', name='stateenum'), nullable=False),
    sa.Column('profile_picture', sa.String(length=200), nullable=False),
    sa.Column('birth_date', sa.Date(), nullable=False),
    sa.Column('telephone', sa.String(length=200), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('url_calendly', sa.String(length=200), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_validated', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('professional', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_professional_email'), ['email'], unique=True)

    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('last_name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('state', sa.Enum('ARTIGAS', 'CANELONES', 'CERRO_LARGO', 'COLONIA', 'DURAZNO', 'FLORES', 'FLORIDA', 'LAVALLEJA', 'MALDONADO', 'MONTEVIDEO', 'PAYSANDU', 'RIO_NEGRO', 'RIVERA', 'ROCHA', 'SALTO', 'SAN_JOSE', 'SORIANO', 'TACUAREMBO', 'TREINTA_Y_TRES', name='stateenum'), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    with op.batch_alter_table('professional', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_professional_email'))

    op.drop_table('professional')
    # ### end Alembic commands ###
